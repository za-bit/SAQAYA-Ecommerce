<template>
  <div class="column">
    <footer class="row">
      <div class="exclusive">
        <h1>Exclusive</h1>
        <h2>Subscribe</h2>
        <p>Get 10% off your first order</p>
        <div class="email">
          <input type="email" placeholder="Enter your email" />
          <img src="@/assets/icons/icon-send.svg" />
        </div>
      </div>
      <div class="support">
        <h2>Support</h2>
        <p>111 Bijoy sarani,Dhaka,</p>
        <p>DH1515,Bangladesh.</p>
        <p>exclusive@gmail.com</p>
        <p>+88015-88888-9999</p>
      </div>
      <div class="account">
        <h2>Account</h2>
        <p>My Account</p>
        <p>Login/Register</p>
        <p>Cart</p>
        <p>Wishlist</p>
        <p>Shop</p>
      </div>
      <div class="quick-link">
        <h2>Quick Link</h2>
        <p>Privacy Policy</p>
        <p>Terms Of Use</p>
        <p>FAQ</p>
        <p>Contact</p>
      </div>
      <div class="download">
        <h2>Download App</h2>
        <p>Save $3 with App New User Only</p>
        <div class="column1">
          <div class="row2">
            <img src="@/assets/icons/Qrcode footer.svg" />
            <div class="column">
              <img src="@/assets/icons/googlePlay.svg" />
              <img src="@/assets/icons/AppStore.svg" />
            </div>
          </div>
          <div class="row2">
            <img src="@/assets/icons/Icon-Facebook.svg" />
            <img src="@/assets/icons/Icon-Twitter.svg" />
            <img src="@/assets/icons/icon-instagram.svg" />
            <img src="@/assets/icons/Icon-Linkedin.svg" />
          </div>
        </div>
      </div>
    </footer>
    <div class="line"></div>
    <div class="row1">
      <img src="@/assets/icons/Group.svg" style="height: 1%" />
      <p>Copyright Rimel 2022. All right reserved</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>

<style scoped>
.row {
  display: flex;
  align-items: center;
  gap: 80px;
  padding: 30px 100px 30px 220px;
}
.row1 {
  display: flex;
  align-items: center;
  margin-left: 40%;
  color: #ccc;
}
.column1 {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.row2 {
  display: flex;
  align-items: center;
  gap: 20px;
}
.column {
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
}
.line {
  width: 100%;
  height: 1px;
  background-color: #ccc;
}
.email {
  position: relative;
  display: flex;
  align-items: center;
}
.email input {
  padding: 8px 45px 8px 10px;
  border-color: white;
  background-color: black;
  border-radius: 4px;
  color: white;
  outline: none;
}
.email img {
  position: absolute;
  right: 10px;
  width: 16px;
  height: 16px;
  cursor: pointer;
}
</style>
