from .models import Cart, CartItem, Order, OrderItem
from apps.products.models import Product
from rest_framework.exceptions import ValidationError


class CartService:
    @staticmethod
    def get_or_create_cart(user):
        cart, _ = Cart.objects.get_or_create(user=user)
        return cart

    @staticmethod
    def add_item(user, product_id, quantity):
        cart = CartService.get_or_create_cart(user)
        
        try:
            product = Product.objects.get(id=product_id, is_active=True)
        except Product.DoesNotExist:
            raise ValidationError('Producto no encontrado')

        if product.stock < quantity:
            raise ValidationError('Stock insuficiente')

        item, created = CartItem.objects.get_or_create(cart=cart, product=product)
        if not created:
            item.quantity += quantity
        else:
            item.quantity = quantity
        item.save()
        return cart

    @staticmethod
    def remove_item(user, product_id):
        cart = CartService.get_or_create_cart(user)
        CartItem.objects.filter(cart=cart, product_id=product_id).delete()
        return cart


class OrderService:
    @staticmethod
    def create_from_cart(user, shipping_address):
        cart = Cart.objects.prefetch_related('items__product').get(user=user)

        if not cart.items.exists():
            raise ValidationError('El carrito está vacío')

        order = Order.objects.create(
            user=user,
            total=cart.total,
            shipping_address=shipping_address
        )

        for item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                product=item.product,
                quantity=item.quantity,
                unit_price=item.product.price
            )
            item.product.stock -= item.quantity
            item.product.save()

        cart.items.all().delete()
        return order