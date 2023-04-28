function convertImageToBase64(file, callback) {
    var reader = new FileReader();
    reader.onload = function () {
        var dataURL = reader.result;
        var canvas = document.createElement('canvas');
        var img = new Image();
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            var dataURL = canvas.toDataURL('image/jpeg');
            callback(dataURL);
        };
        img.src = dataURL;
    };
    reader.readAsDataURL(file);
}


// code html ที่ลองใชัเทส

/*
<!DOCTYPE html>
<html>
<head>
    <title>Convert Image to Base64 Example</title>
</head>
<body>
    <input type="file" id="input-file">
    <img id="preview">
    <div id="result"></div>
    <script src="convertImageToBase64.js"></script>
    <script>
        var input = document.getElementById('input-file');
        input.addEventListener('change', function() {
            var file = input.files[0];
            convertImageToBase64(file, function(base64) {
                console.log(base64);
                var img = document.getElementById('preview');
                img.src = base64;
                var result = document.getElementById('result');
                result.innerText = base64;
            });
        });
    </script>
</body>
</html>
*/