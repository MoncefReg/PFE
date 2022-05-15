from rest_framework.pagination import PageNumberPagination


class DefaultPagination(PageNumberPagination):
    page_size_query_param = 'page_size'
    max_page_size = 100

    def get_page_size(self, request):
        if request.query_params.get(self.page_size_query_param, None) == "-1":
            return None

        return super().get_page_size(request)
