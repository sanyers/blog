vue自定义指令
```js
directives: {
    debounce: {
      inserted: (el, binding) => {
        let timer = null;
        el.addEventListener('click', () => {
          console.log(binding);
          if (!timer) {
            el.disabled = true;
            timer = setTimeout(() => {
              clearTimeout(timer);
              timer = null;
              el.removeAttribute('disabled');
            }, binding.value || 1000);
          }
        });
      },
    },
  },
```