from django.urls import path
from .views import PaymentViewSet

payment_create_intent = PaymentViewSet.as_view({'post': 'create_intent'})
payment_webhook = PaymentViewSet.as_view({'post': 'webhook'})

urlpatterns = [
    path('create_intent/', payment_create_intent, name='create_intent'),
    path('webhook/', payment_webhook, name='webhook'),
]