from tethys_sdk.base import TethysAppBase, url_map_maker


class HikingTrailExplorer(TethysAppBase):
    """
    Tethys app class for Hiking Trail Explorer.
    """

    name = 'Hiking Trail Explorer'
    index = 'hiking_app_js:home'
    icon = 'hiking_app_js/images/icon.gif'
    package = 'hiking_app_js'
    root_url = 'hiking-app-js'
    color = '#34495e'
    description = 'Place a brief description of your app here.'
    enable_feedback = False
    feedback_emails = []

        
    def url_maps(self):
        """
        Add controllers
        """
        UrlMap = url_map_maker(self.root_url)

        url_maps = (UrlMap(name='home',
                           url='hiking-app-js',
                           controller='hiking_app_js.controllers.home'),
                    UrlMap(name='viewshed',
                           url='viewshed',
                           controller='hiking_app_js.controllers.viewshed'),
                    UrlMap(name='bufferpoint',
                           url='bufferpoint',
                           controller='hiking_app_js.controllers.bufferpoint'),

        )

        return url_maps