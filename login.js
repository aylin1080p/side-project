

const form = document.getElementById("loginForm"); // loginForm id'si olan bir form lazim htmlde
// burada loginFormun Domunu form degiskendinde sakliyor artik
// yani form.name veya form.password bilgilerini alacagiz yer ayarladik

//form gonderildiginde neler olacak bu blokta yaziliyor 
form.addEventListener("submit", function (event) {
    event.preventDefault(); //tarayicinin varsayilan submit eventlerini engeller


    const email = form.email.value.trim();
    const password = form.password.value.trim();
    // form icindeki inputlarin her birini aldik kendi name'inde burda yeniden olusturduk


    // login butonuna basilinca emal ve sifreyi al sunucuya gonder
    fetch("http://127.0.0.1:5500/index.html", {
        method: "POST",
        body: JSON.stringify({
            email: email,
            password: password
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(function (response) { // sunucudan cevap gelince calisir

            // bi denetim ekleyelim her seyi getirmesin

            if (!response.ok) {
                throw new Error("Login basarisiz");
            }
            return response.json(); // sunucu cevabini js objesine cevirir
        })
        .then(function (data) {
            console.log("Sunucu cevap verdi ", data);
            localStorage.setItem("token", data.token);
        })

        .catch(function (error) {
            console.log("hata olustu", error.message);
        });

}); // sunucuya gonderme bitti 

