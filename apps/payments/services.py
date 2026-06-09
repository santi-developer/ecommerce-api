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

        intent = stripe.PaymentIntent.create(
        amount=int(order.total * 100),
        currency='usd',
        metadata={'order_id': order.id}
    )

        payment, created = Payment.objects.get_or_create(
            order=order,
            defaults={
                'stripe_payment_intent': intent.id,
                'amount': order.total
            }
        )

        if not created:
            existing_intent = stripe.PaymentIntent.retrieve(payment.stripe_payment_intent)
            return existing_intent.client_secret

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