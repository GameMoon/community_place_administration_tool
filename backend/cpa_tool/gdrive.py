from __future__ import print_function
from datetime import date, datetime, timedelta
import pickle
import os.path
import io
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload, MediaIoBaseDownload
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request

# If modifying these scopes, delete the file token.pickle.
SCOPES = ['https://www.googleapis.com/auth/drive']

class GDrive:
    folderId = '1FeikQNGwFSbiXaAXy1UHLx-sUJX_SfLv'
    archiveId = '1rhY5M9LDkJ7E-CZU0-vZf_24cEa79lXq'
    dateFormat = '%Y.%m.%d.'
    timeFormat = '%H.%M.%S'

    def __init__(self):
        creds = None
        if os.path.exists('token.pickle'):
            with open('token.pickle', 'rb') as token:
                creds = pickle.load(token)

        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                niki = InstalledAppFlow.from_client_secrets_file(
                    'credentials.json', SCOPES)
                creds = niki.run_local_server(port=0)

            with open('token.pickle', 'wb') as token:
                pickle.dump(creds, token)

        self.service = build('drive', 'v3', credentials=creds)

    def getContents(self, id):
        page_token = None
        folders = []
        while True:
            response = self.service.files().list(
                q = "'{}' in parents".format(id),
                spaces = 'drive',
                fields = 'nextPageToken, files(id, name)',
                pageToken = page_token
            ).execute()
            folders += response.get('files',[]);
            page_token = response.get('nextPageToken', None)
            if page_token is None:
                break
        return folders

    def getDates(self):
        return self.getContents(self.folderId)

    def getEntries(self, date):
        return self.getContents(date['id'])

    def getBytes(self, entry):
        request = self.service.files().get_media(fileId=entry['id'])
        fh = io.BytesIO()
        downloader = MediaIoBaseDownload(fh, request)
        done = False
        while done is False:
            status, done = downloader.next_chunk()
        return fh

    def _exportBytes(self, name, bytes):
        with open(name, "wb") as f:
            f.write(bytes.getvalue())

    def saveEntry(self, name, entry):
        bytes = self.getBytes(entry)
        self._exportBytes(name, bytes)

    def _getTodayDate(self):
        return date.today().strftime(self.dateFormat)

    def _createFolder(self, parentId, name):
        file_metadata = {
            'name' : name,
            'parents' : [parentId],
            'mimeType' : 'application/vnd.google-apps.folder'
        }
        return self.service.files().create(
            body=file_metadata,
            fields='id,name'
        ).execute()

    def _getTodayFolder(self):
        if hasattr(self, 'today'):
            if self.today == self._getTodayDate():
                return self.todayFolder

        self.today = self._getTodayDate()
        dates = self.getDates()
        for date in dates:
            if date['name'] == self.today:
                self.todayFolder = date
                return date

        self.todayFolder = self._createFolder(self.folderId, self.today)
        return self.todayFolder

    def _getNextFileName(self):
        return datetime.now().strftime(self.timeFormat)

    def _isFileExisting(self, parent, name):
        response = self.service.files().list(
            q = "name contains '{}' and '{}' in parents".format(
                name,
                parent
            ),
            spaces = 'drive',
            fields = 'nextPageToken, files(id)',
            pageToken = None
        ).execute()
        return len(response.get('files',[])) > 0

    def uploadImage(self, path):
        parent = self._getTodayFolder()['id']
        fileName = self._getNextFileName()
        if self._isFileExisting(parent, fileName):
            return None

        file_metadata = {
            'name': '{}.jpg'.format(fileName),
            'parents': [parent]
        }
        media = MediaFileUpload(path, mimetype='image/jpeg')
        return self.service.files().create(
            body=file_metadata,
            media_body=media,
            fields='id,name'
        ).execute()

    def _moveEntry(self, id, parent):
        entry = self.service.files().get(
            fileId=id,
            fields='parents'
        ).execute()
        prevParents = ",".join(entry.get('parents'))

        return self.service.files().update(
            fileId=id,
            addParents=parent,
            removeParents=prevParents,
            fields='id,name'
        ).execute()

    def handleArchival(self):
        folders = self.getDates()
        archivalDate = (datetime.today() - timedelta(days = 30)).strftime(self.dateFormat)
        for folder in folders:
            if folder['name'] < archivalDate:
                self._moveEntry(folder['id'], self.archiveId)
