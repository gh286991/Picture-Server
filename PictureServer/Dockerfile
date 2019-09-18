FROM django

RUN  pip install django-cors-headers

COPY . . 

EXPOSE 8020

CMD ["python", "manage.py", "runserver", "0.0.0.0:8020"]
