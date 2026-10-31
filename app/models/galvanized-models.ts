type GalvanizedModel = {
  model: string;
  bucketSize: string;
  originalPrice: number;
  price: number;
  images: { src: string; alt: string }[];
};

export const galvanizedModels: Record<string, GalvanizedModel> = {
  "108 ProScreen Galvanized": {
    "model": "108 ProScreen Galvanized",
    "bucketSize": "Design For Buckets Up To 108 inches",
    "originalPrice": 20900,
    "price": 19900,
    "images": [
      {
        "src": "/108Galvanized/108ProScreenGmain.webp",
        "alt": "108 ProScreen Galvanized — view 1"
      },
      {
        "src": "/108Galvanized/108ProScreenGalvanizedpowerbox.webp",
        "alt": "108 ProScreen Galvanized — view 2"
      },
      {
        "src": "/108Galvanized/108ProScreenGalvanizedsuspension.webp",
        "alt": "108 ProScreen Galvanized — view 3"
      },
      {
        "src": "/108Galvanized/108ProScreenGback.webp",
        "alt": "108 ProScreen Galvanized — view 4"
      },
      {
        "src": "/108Galvanized/108ProScreenGback1.webp",
        "alt": "108 ProScreen Galvanized — view 5"
      },
      {
        "src": "/108Galvanized/108ProScreenGside.webp",
        "alt": "108 ProScreen Galvanized — view 6"
      },
      {
        "src": "/108Galvanized/108ProScreenGside1.webp",
        "alt": "108 ProScreen Galvanized — view 7"
      }
    ]
  },
  "78 ProScreen Galvanized": {
    "model": "78 ProScreen Galvanized",
    "bucketSize": "Design For Buckets Up To 82 inches",
    "originalPrice": 14900,
    "price": 13900,
    "images": [
      {
        "src": "/78Galvanized/78ProScreenGalmain.webp",
        "alt": "78 ProScreen Galvanized — view 1"
      },
      {
        "src": "/78Galvanized/78ProScreenGalvaback.webp",
        "alt": "78 ProScreen Galvanized — view 2"
      },
      {
        "src": "/78Galvanized/78ProScreenGalvaback2.webp",
        "alt": "78 ProScreen Galvanized — view 3"
      },
      {
        "src": "/78Galvanized/78ProScreenGpowerbox.webp",
        "alt": "78 ProScreen Galvanized — view 4"
      },
      {
        "src": "/78Galvanized/78ProScreenGside.webp",
        "alt": "78 ProScreen Galvanized — view 5"
      },
      {
        "src": "/78Galvanized/78ProScreenGside1.webp",
        "alt": "78 ProScreen Galvanized — view 6"
      },
      {
        "src": "/78Galvanized/78ProScreenGsuspension.webp",
        "alt": "78 ProScreen Galvanized — view 7"
      }
    ]
  },
  "68 ProScreen Galvanized": {
    "model": "68 ProScreen Galvanized",
    "bucketSize": "Design For Buckets Up To 66 inches",
    "originalPrice": 8900,
    "price": 7900,
    "images": []
  }
};
