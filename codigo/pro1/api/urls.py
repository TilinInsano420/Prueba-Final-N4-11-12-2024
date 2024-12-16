from rest_framework.routers import DefaultRouter
from .views import UserViewSet, MascotaViewSet, ConsultaViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'mascotas', MascotaViewSet)
router.register(r'consultas', ConsultaViewSet)

urlpatterns = router.urls
