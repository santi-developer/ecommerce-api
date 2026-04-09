from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .services import PaymentService
from .models import Payment
from .serializers import PaymentSerializer


class PaymentViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['post'])
    def create_intent(self, request):
        order_id = request.data.get('order_id')
        client_secret = PaymentService.create_payment_intent(order_id, request.user)
        return Response({'client_secret': client_secret})

    @action(detail=False, methods=['post'])
    def webhook(self, request):
        payload = request.body
        sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
        PaymentService.handle_webhook(payload, sig_header)
        return Response({'status': 'ok'})