from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Cart, Order
from .serializers import CartSerializer, OrderSerializer
from .services import CartService, OrderService


class CartViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        cart = CartService.get_or_create_cart(request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def add_item(self, request):
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity', 1)
        cart = CartService.add_item(request.user, product_id, quantity)
        return Response(CartSerializer(cart).data)

    @action(detail=False, methods=['delete'])
    def remove_item(self, request):
        product_id = request.data.get('product_id')
        cart = CartService.remove_item(request.user, product_id)
        return Response(CartSerializer(cart).data)


class OrderViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        orders = Order.objects.filter(user=request.user).prefetch_related('items__product')
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)

    def create(self, request):
        shipping_address = request.data.get('shipping_address')
        if not shipping_address:
            return Response({'error': 'Dirección de envío requerida'}, status=status.HTTP_400_BAD_REQUEST)
        order = OrderService.create_from_cart(request.user, shipping_address)
        return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)
