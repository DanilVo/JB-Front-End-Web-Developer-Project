$("#about").click(addAboutDesc);

function addAboutDesc() {
    const row = $(".row"); 
  row.html(`
    <div class="container-fluid text-center">
        <div class="row aboutCard">
            <div class="colBase col-sm-12 col-md-12 col-lg-4 ">Welcome to BitBlaze - Your Gateway to Real-Time Cryptocurrency Insights!</div>
            <div class="colBase col-sm-12 col-md-12 col-lg-7 ">Welcome to BitBlaze, your ultimate destination for real-time cryptocurrency insights! Our cutting-edge web application is designed to provide you with an immersive and user-friendly experience, empowering you with the latest data on your favorite digital assets.</div>
        </div>
        <div class="row aboutCard">
            <div class="colBase col-sm-12 col-md-12 col-lg-4">Comprehensive Coin Data - All Your Favorite Cryptocurrencies in One Place.</div>
            <div class="colBase col-sm-12 col-md-12 col-lg-7">At BitBlaze, we understand the importance of having quick access to cryptocurrency information, and that's why our platform connects to multiple side APIs to fetch real-time data for a wide range of coins. From Bitcoin to Ethereum, and from Litecoin to Ripple, we cover an extensive selection of cryptocurrencies to cater to every crypto enthusiast's needs.</div>
        </div>
        <div class="row aboutCard">
            <div class="colBase col-sm-12 col-md-12 col-lg-4"> Intuitive Dashboard - Easy Navigation and Informative Coin Cards.</div>
            <div class="colBase col-sm-12 col-md-12 col-lg-7">Upon accessing BitBlaze, you'll be greeted with a sleek and intuitive user interface. The dashboard is elegantly organized, presenting cryptocurrency coins as separate cards. Each card is a gateway to a wealth of information about the respective coin, including its current price in dollars, euros, and NIS, allowing you to keep track of the market at all times.</div>
        </div>
        <div class="row aboutCard">
            <div class="colBase col-sm-12 col-md-12 col-lg-4">Customization - Tailor Your Crypto Experience.</div>
            <div class="colBase col-sm-12 col-md-12 col-lg-7">But the power of BitBlaze doesn't stop there. We understand that in the dynamic world of cryptocurrencies, staying informed is key. Hence, you can customize your experience by selecting up to five coins that matter most to you, and these will be displayed for quick access. You'll have access to detailed information about each coin, empowering you to make informed decisions about your investments.</div>
        </div>
        <div class="row aboutCard">
            <div class="colBase col-sm-12 col-md-12 col-lg-4">Security First - Protecting Your Privacy and Data</div>
            <div class="colBase col-sm-12 col-md-12 col-lg-7">As a user-centric platform, we prioritize your security and privacy. BitBlaze employs state-of-the-art security measures to safeguard your data and ensure a safe browsing experience. You can explore the world of cryptocurrencies with confidence, knowing that we prioritize the protection of your personal information.</div>
        </div>
        <div class="row aboutCard">
            <div class="colBase col-sm-12 col-md-12 col-lg-4">A Platform for All - Catering to Crypto Enthusiasts of All Levels</div>
            <div class="colBase col-sm-12 col-md-12 col-lg-7">Whether you're a seasoned crypto enthusiast or someone curious about the cryptocurrency market, BitBlaze is designed to cater to a wide audience. Our platform is user-friendly, accessible, and informative, making it equally valuable for beginners and experienced users alike.</div>
        </div>
        <div class="row aboutCard">
            <div class="colBase col-sm-12 col-md-12 col-lg-4"> Join BitBlaze - Embark on Your Crypto Adventure.</div>
            <div class="colBase col-sm-12 col-md-12 col-lg-7">Join BitBlaze today and embark on a journey through the fascinating world of cryptocurrencies. Stay informed, track your favorite coins, and make well-informed decisions with real-time data at your fingertips. Our team is dedicated to continuously improving and expanding our services, ensuring that you stay ahead in the ever-evolving landscape of digital assets.</div>
        </div>
    </div>
`);
// row.hide()
// row.show(1000)

$("row > .colBase").animate("{transform: translateX(-800px)}");
}
