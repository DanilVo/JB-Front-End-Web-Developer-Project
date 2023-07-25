$(function() {
  $("#about").click(addAboutDesc);
  function addAboutDesc() {
    const row = $(".row");
    row.html(`
        <div class="container text-center">
        <nav>
            <ul>
              <li>
                <a href="https://linkedin.com/in/danil-volobuyev" target="”_blank”"
                  ><i
                    class="fa-brands fa-linkedin-in fa-xl"
                    style="color: #dedcdc"
                  ></i
                  ><span class="show-up linkedin">LinkedIn</span></a
                >
              </li>
              <li>
                <a href="https://github.com/DanilVo" target="”_blank”"
                  ><i class="fa-brands fa-github fa-xl" style="color: #dedcdc"></i
                  ><span class="show-up github">GitHub</span></a
                >
              </li>
              <li>
                <a href="mailto: dani736@gmail.com"
                  ><i class="fa-solid fa-envelope fa-xl" style="color: #dedcdc"></i
                  ><span class="show-up email">Email</span></a
                >
              </li>
            </ul>
          </nav>
        <h1>About me:</h1>
            <p class="about-me p-5">
              Hello, my name is Danil Volobuyev, and I am a passionate beginner
              front-end developer. I currently have experience with HTML, CSS, and
              JavaScript, and I'm always eager to learn more. I love the creativity
              and problem-solving that comes with designing and developing
              beautiful, user-friendly websites. <br />
              In my free time, I enjoy practicing my coding skills by working on
              personal projects and exploring new technologies. I am committed to
              staying up-to-date with the latest developments in the field and
              constantly pushing myself to improve. <br />
              I believe that great design and functionality can have a profound
              impact on the user experience, and I am dedicated to creating websites
              that are both visually appealing and intuitive to use. I am excited to
              continue growing as a front-end developer and contributing to the
              exciting and constantly evolving world of web development.
            </p>
        <h1>About project:</h1>
            <div class="row aboutCard">
                <div class="title-1 colBase col-sm-12 col-md-12 col-lg-4 ">Welcome to BitBlaze - Your Gateway to Real-Time Cryptocurrency Insights!</div>
                <div class="context-1 colBase col-sm-12 col-md-12 col-lg-7 ">Welcome to BitBlaze, your ultimate destination for real-time cryptocurrency insights! Our cutting-edge web application is designed to provide you with an immersive and user-friendly experience, empowering you with the latest data on your favorite digital assets.</div>
            </div>
            <div class="row aboutCard">
                <div class="title title-2 colBase col-sm-12 col-md-12 col-lg-4">Comprehensive Coin Data - All Your Favorite Cryptocurrencies in One Place.</div>
                <div class="context context-2 colBase col-sm-12 col-md-12 col-lg-7">At BitBlaze, we understand the importance of having quick access to cryptocurrency information, and that's why our platform connects to multiple side APIs to fetch real-time data for a wide range of coins. From Bitcoin to Ethereum, and from Litecoin to Ripple, we cover an extensive selection of cryptocurrencies to cater to every crypto enthusiast's needs.</div>
            </div>
            <div class="row aboutCard">
                <div class="title title-3 colBase col-sm-12 col-md-12 col-lg-4"> Intuitive Dashboard - Easy Navigation and Informative Coin Cards.</div>
                <div class="context context-3 colBase col-sm-12 col-md-12 col-lg-7">Upon accessing BitBlaze, you'll be greeted with a sleek and intuitive user interface. The dashboard is elegantly organized, presenting cryptocurrency coins as separate cards. Each card is a gateway to a wealth of information about the respective coin, including its current price in dollars, euros, and NIS, allowing you to keep track of the market at all times.</div>
            </div>
            <div class="row aboutCard">
                <div class="title title-4 colBase col-sm-12 col-md-12 col-lg-4">Customization - Tailor Your Crypto Experience.</div>
                <div class="context context-4 colBase col-sm-12 col-md-12 col-lg-7">But the power of BitBlaze doesn't stop there. We understand that in the dynamic world of cryptocurrencies, staying informed is key. Hence, you can customize your experience by selecting up to five coins that matter most to you, and these will be displayed for quick access. You'll have access to detailed information about each coin, empowering you to make informed decisions about your investments.</div>
            </div>
            <div class="row aboutCard">
                <div class="title title-5 colBase col-sm-12 col-md-12 col-lg-4">Security First - Protecting Your Privacy and Data</div>
                <div class="context context-5 colBase col-sm-12 col-md-12 col-lg-7">As a user-centric platform, we prioritize your security and privacy. BitBlaze employs state-of-the-art security measures to safeguard your data and ensure a safe browsing experience. You can explore the world of cryptocurrencies with confidence, knowing that we prioritize the protection of your personal information.</div>
            </div>
            <div class="row aboutCard">
                <div class="title title-6 colBase col-sm-12 col-md-12 col-lg-4">A Platform for All - Catering to Crypto Enthusiasts of All Levels</div>
                <div class="context context-6 colBase col-sm-12 col-md-12 col-lg-7">Whether you're a seasoned crypto enthusiast or someone curious about the cryptocurrency market, BitBlaze is designed to cater to a wide audience. Our platform is user-friendly, accessible, and informative, making it equally valuable for beginners and experienced users alike.</div>
            </div>
            <div class="row aboutCard my-5">
                <div class="title title-7 colBase col-sm-12 col-md-12 col-lg-4"> Join BitBlaze - Embark on Your Crypto Adventure.</div>
                <div class="context context-7 colBase col-sm-12 col-md-12 col-lg-7">Join BitBlaze today and embark on a journey through the fascinating world of cryptocurrencies. Stay informed, track your favorite coins, and make well-informed decisions with real-time data at your fingertips. Our team is dedicated to continuously improving and expanding our services, ensuring that you stay ahead in the ever-evolving landscape of digital assets.</div>
            </div>
        </div>
        <h3>Contact us:</h3>
        <form class="row  g-3" action="mailto:dani736@gmail.com" method="post" enctype="text/plain">
        <div class="col-md-4">
          <label for="validationServer01" class="form-label">Full name</label>
          <input
            type="text"
            class="form-control"
            id="validationServer01"
            name="Full name"
            required
          />
        </div>
        <div class="col-md-4">
          <label for="validationServer02" class="form-label">Phone number</label>
          <input
            type="tel"
            class="form-control"
            id="validationServer02"
            name="Phone number"
          />
        </div>
        <div class="col-md-4">
          <label for="validationServer03" class="form-label">Email</label>
          <input
            type="email"
            class="form-control"
            id="validationServer03"
            name="Email"
            required
          />
        </div>  
        <div class="col-12">
          <button class="btn btn-primary" type="submit">Submit form</button>
        </div>
      </form>
    `);
  }

  $(window).scroll(function () {
    if ($(window).scrollTop() >= 200) {
      $(".title-2").animate({ right: "0" }, 1000);
      $(".context-2").animate({ left: "0" }, 1000);
    }
    if ($(window).scrollTop() >= 600) {
      $(".title-3").animate({ right: "0" }, 1000);
      $(".context-3").animate({ left: "0" }, 1000);
    }
    if ($(window).scrollTop() >= 1000) {
      $(".title-4").animate({ right: "0" }, 1000);
      $(".context-4").animate({ left: "0" }, 1000);
    }
    if ($(window).scrollTop() >= 1400) {
      $(".title-5").animate({ right: "0" }, 1000);
      $(".context-5").animate({ left: "0" }, 1000);
    }
    if ($(window).scrollTop() >= 2100) {
      $(".title-6").animate({ right: "0" }, 1000);
      $(".context-6").animate({ left: "0" }, 1000);
    }
    if ($(window).scrollTop() >= 2200) {
      $(".title-7").animate({ right: "0" }, 1000);
      $(".context-7").animate({ left: "0" }, 1000);
    }
  });
});
