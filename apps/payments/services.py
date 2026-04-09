import stripe
from django.conf import settings
from .models import Payment
from apps.orders.models import Order
from rest_framework.exceptions import ValidationError

stripe.api_key = settings.STRIPE_SECRET_KEY


class PaymentService:
    @staticmethod
    def create_payment_intent(order_id, user):
        try:
            order = Order.objects.get(id=order_id, user=user)
        except Order.DoesNotExist:
            raise ValidationError('Orden no encontrada')

        if order.status != 'pending':
            raise ValidationError('Esta orden ya fue procesada')

        intent = stripe.PaymentIntent.create(
            amount=int(order.total * 100),  # Stripe maneja centavos
            currency='usd',
            metadata={'order_id': order.id}
        )

        Payment.objects.create(
            order=order,
            stripe_payment_intent=intent.id,
            amount=order.total
        )

        return intent.client_secret

    @staticmethod
    def confirm_payment(payment_intent_id):
        try:
            payment = Payment.objects.get(stripe_payment_intent=payment_intent_id)
        except Payment.DoesNotExist:
            raise ValidationError('Pago no encontrado')

        payment.status = 'completed'
        payment.save()

        payment.order.status = 'paid'
        payment.order.save()

        return payment