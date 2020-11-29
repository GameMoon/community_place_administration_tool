@echo off

start "" /d ".\" celery -A backend worker -l info
start "" /d ".\" celery -A backend beat -l info