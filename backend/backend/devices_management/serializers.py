from rest_framework import serializers
from baseapp.models import *


class NodeSerializer(serializers.ModelSerializer):
    cluster_data = serializers.SerializerMethodField()
    cluster = serializers.PrimaryKeyRelatedField(write_only=True,
                                                 queryset=Cluster.objects.all(),
                                                 required=False)

    def get_cluster_data(self, instance):
        return {
            "id": instance.cluster.pk,
            "name": instance.cluster.name
        }

    class Meta:
        model = Node
        exclude = ('deleted', 'created_on', 'updated_on')


class ClusterSerializer(serializers.ModelSerializer):
    nodes = NodeSerializer(many=True)

    class Meta:
        model = Cluster
        exclude = ('deleted', 'created_on', 'updated_on')
