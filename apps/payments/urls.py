from django.urls import path
from .views import PaymentViewSet

payment_create_intent = PaymentViewSet.as_view({'post': 'create_intent'})
payment_webhook = PaymentViewSet.as_view({'post': 'webhook'})
payment_confirm = PaymentViewSet.as_view({'post': 'confirm'})

urlpatterns = [
    path('create_intent/', payment_create_intent, name='create_intent'),
    path('confirm/', payment_confirm, name='confirm'),
    path('webhook/', payment_webhook, name='webhook'),
]