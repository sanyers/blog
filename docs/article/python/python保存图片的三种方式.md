# python保存图片的三种方式

## 1、PIL

```py
from PIL import Image

I = Image.open('./image.png')
print(I.size)
I.show()
I.save('./save.png')
```

## 2、matplotlib

```py
import matplotlib.pyplot as plt
from scipy.misc import imread, imsave

I = imread('./image.png')
print(I.size)
imsave('./save.png', I)
plt.imsave(I)
plt.show()
```

## 3、openCV

```py
import cv2

I = cv2.imread('./image.png')
cv2.imwrite('./save.png', I)
```