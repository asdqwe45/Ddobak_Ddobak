FROM nvidia/cuda:11.8.0-cudnn8-runtime-ubuntu18.04

LABEL authors="leeminkyu1212"

RUN apt update && apt install -y \
    python3-pip
RUN add-apt-repository ppa:deadsnakes/ppa
RUN apt update
RUN apt install python3.11

RUN pip3 install pipenv

WORKDIR /app
COPY ./Pipfile ./Pipfile.lock /app/

RUN pipenv install --deploy --ignore-pipfile
RUN pipenv shell
COPY ./app /app

CMD ["pipenv", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]