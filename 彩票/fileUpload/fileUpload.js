$(function() {
    var fileUpload = {
        block: 10240,
        fileLoaded: 0,
        fileSize: 0,
        content: "",
        status: !0,
        obj: {},
        readBlob: function() {
            var a = new FileReader;
            console.log(fileUpload.file);
            a.onload = function(b) {
                console.log(b);
                fileUpload.fileLoaded += b.total;
                var c = fileUpload.fileLoaded / fileUpload.fileSize;
                c < 1 ? (fileUpload.readBlob(), fileUpload.content += a.result) : (c = 1, fileUpload.content += a.result);
                var d = Math.ceil(100 * c) + "%";
                $("#uploadProgressBar").text(d),
                $("#uploadProgressBar").css("width", d),
                1 == c && ($("#ballInputArea").val(fileUpload.content), $(".uploadProgressBar").fadeOut(1e3,
                function() {
                    $("#uploadProgressBar").text("0%"),
                    $("#uploadProgressBar").css("width", "0%");
                    var a = $(":file");
                    a.after(a.clone().val("")),
                    a.remove(),
                    lott.betContentUpload(),
                    $("#ballInputArea").trigger("input")
                }))
            };
            var b;
            if (fileUpload.file.webkitSlice) b = fileUpload.file.webkitSlice(fileUpload.fileLoaded, fileUpload.fileLoaded + fileUpload.block + 1);
            else if (fileUpload.file.mozSlice) b = fileUpload.file.mozSlice(fileUpload.fileLoaded, fileUpload.fileLoaded + fileUpload.block + 1);
            else {
                if (!fileUpload.file.slice) return void console.log("alerts", "您的浏览器不支持文件上传!");
                b = fileUpload.file.slice(fileUpload.fileLoaded, fileUpload.fileLoaded + fileUpload.block + 1)
            }
            // console.log(a.readAsText());
            a.readAsText(b)
            // console.log(a.readAsText(b));
            console.log(fileUpload.content);
        },
        swfUpload: function(a, b) {
            if ("start" == a && ($(".uploadProgressBar").show(), $("#uploadProgressBar").text("0%"), $("#uploadProgressBar").css("width", "0%")), "loading" == a && ($("#uploadProgressBar").text(b), $("#uploadProgressBar").css("width", b)), "complete" == a && $(".uploadProgressBar").fadeOut(1e3,
            function() {
                $("#uploadProgressBar").text("0%"),
                $("#uploadProgressBar").css("width", "0%");
                var a = void 0,
                c = globalVar.currentLottery.series[0].gameGroup;
                "11X5" == c ? (a = b.replace(/[^\d\r\n\f,;]+/g, ""), a = a.replace(/[^\d\d]+/g, "@")) : (a = b.replace(/[^\d\r\n\f\s,;#]+/g, ""), a = a.replace(/[^\d#]+/g, "@"));
                var d = "@" == a.substring(a.length - 1) ? a.substring(0, a.length - 1) : a,
                e = d.split("@");
                "11X5" == c ? $("#ballInputArea").val(e.join("\n")) : $("#ballInputArea").val(e.join(" ")),
                $("#ballInputArea").trigger("input")
            }), "error" == a) return void console.log("alerts", b)
        }
    };

    betContentUpload();

    function betContentUpload() {
        $("#betContentFile").off("change").on("change",
        function(a) {
            if (fileUpload.content = "", fileUpload.file = this.files[0], fileUpload.fileLoaded = 0, fileUpload.fileSize = fileUpload.file.size, !fileUpload.file) {
                TCG.Alert("alerts", "请您选择文件!");
                var b = $(":file");
                return b.after(b.clone().val("")),
                b.remove(),
                void lott.betContentUpload()
            }
            if ("text/plain" != fileUpload.file.type) {
                TCG.Alert("alerts", "您选择的文件类型不符合要求,<br/>目前只支持txt文本格式的文件!");
                var b = $(":file");
                return b.after(b.clone().val("")),
                b.remove(),
                void lott.betContentUpload()
            }
            if (fileUpload.file.size > 1048576) {
                TCG.Alert("alerts", "您选择的文件大小超过1M,<br/>目前只支持1M大小的文件!");
                var b = $(":file");
                return b.after(b.clone().val("")),
                b.remove(),
                void lott.betContentUpload()
            }
            $(".uploadProgressBar").show(),
            fileUpload.readBlob()
        })
    }

    $('#swfFileUpload').click(function(){
        console.log(12);
    });
});