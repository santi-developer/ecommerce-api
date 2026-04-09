# Ecommerce API

API REST para ecommerce desarrollada con Django REST Framework.

## Tecnologías

- Python / Django / Django REST Framework
- PostgreSQL
- Redis + Celery
- Stripe (pagos)
- Docker + Docker Compose
- JWT Authentication

## Requisitos

- Docker
- Docker Compose

## Instalación

1. Clona el repositorio:
git clone https://github.com/tu-usuario/ecommerce-api.git
cd ecommerce-api

2. Crea el archivo `.env` basado en `.env.example`:
cp .env.example .env

3. Agrega tus variables de entorno en `.env`

4. Levanta el proyecto:
docker-compose up --build

5. Corre las migraciones:
docker-compose exec backend python manage.py migrate

6. Crea un superusuario:
docker-compose exec backend python manage.py createsuperuser

## Endpoints principales

| Método | URL | Descripción |
|--------|-----|-------------|
| POST | /api/users/register/ | Registro |
| POST | /api/users/login/ | Login |
| GET | /api/products/ | Listar productos |
| POST | /api/orders/cart/add_item/ | Agregar al carrito |
| POST | /api/orders/ | Crear orden |
| POST | /api/payments/create_intent/ | Crear pago |

## Documentación

Una vez levantado el proyecto entra a:
http://localhost:8000/api/docs/

## Admin

http://localhost:8000/admin/