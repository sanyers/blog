self.addEventListener('message', evt => {
  console.log(evt.data);
  getFile('/file/111.pdf');
  console.log(XMLHttpRequest.DONE);
});

function getFile(url) {
  const xhr = new XMLHttpRequest();
  xhr.open('get', url, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      console.log(xhr.response);
    }
  };
  xhr.send(null);
}

// http://124.71.60.204:8130/sr/uploadFiles/8c848179c0814d6488d637e938a60884/smart-meeting/files/%E3%80%90%E5%8D%8E%E9%93%BE%E6%99%BA%E6%85%A7%E3%80%91%E5%85%AC%E5%8F%B8%E4%BB%8B%E7%BB%8D+-+20211101.pdf
