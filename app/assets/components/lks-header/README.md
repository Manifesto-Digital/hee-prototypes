# LKS-Header

Includes all functionality of the NHS header, refer to that documentation for more deatail on setting up the header with logo, search options etc.

To add a submenu, simply add a "children" object to the normal header template, like so:

{{ lksHeader({
    "showNav": "true",
    "showSearch": "true",
    "organisation": {
      "name": "Health Education England",
      "descriptor": "Library and Knowledge Services"
    },
    "primaryLinks": [
      {
        "url": "/",
        "label": "Item with children",
        "children": [
          {
            "url": "/",
            "label": "Lorem"
          },
          {
            "url": "/",
            "label": "Ipsum"
          },
          {
            "url": "/",
            "label": "Dolor Set"
          },
          {
            "url": "/",
            "label": "Amet"
          }
        ]
      },
      {
        "url": "/",
        "label": "Single Item"
      },
    ]
  })
}}

The macro will shuffle the URL down into the submenu automatically.



