<template>
  <div class="about__page">
    <!-- Breadcrumb -->
    <div class="breadcrumb">
      <router-link to="/" class="breadcrumb__link">Home</router-link>
      <span class="breadcrumb__slash"> / </span>
      <span class="breadcrumb__current">About</span>
    </div>
    <div class="about">
      <div class="about__text">
        <h1 class="about__title">Our Story</h1>
        <p class="about__paragraph about__paragraph--first">
          Launced in 2015, Exclusive is South Asia’s premier online shopping
          makterplace with an active presense in Bangladesh. Supported by wide
          range of tailored marketing, data and service solutions, Exclusive has
          10,500 sallers and 300 brands and serves 3 millioons customers across
          the region.
        </p>
        <p class="about__paragraph about__paragraph--second">
          Exclusive has more than 1 Million products to offer, growing at a very
          fast. Exclusive offers a diverse assotment in categories ranging from
          consumer.
        </p>
      </div>
      <img :src="aboutImg" class="about__image" width="605" height="509" />
    </div>
    <div class="stats">
      <div
        v-for="(item, index) in stats"
        :key="index"
        class="stats__box"
        :class="{ highlight: item.highlight }"
      >
        <div class="stats__icon">
          <img :src="item.icon" />
        </div>
        <h2 class="stats__number">{{ item.number }}</h2>
        <p class="stats__label">{{ item.text }}</p>
      </div>
    </div>
    <div class="about__wrapper">
      <div class="team">
        <div v-for="member in team" :key="member.name" class="team__card">
          <div class="team__image-box">
            <img class="team__image" :src="member.image" />
          </div>
          <h3 class="team__name">{{ member.name }}</h3>
          <p class="team__role">{{ member.role }}</p>
          <div class="team__social">
            <img v-for="icon in socialIcons" :key="icon" :src="icon" />
          </div>
        </div>
      </div>

      <div class="features">
        <div v-for="item in features" :key="item.title" class="features__box">
          <img :src="item.icon" />

          <h4 class="features__title">{{ item.title }}</h4>
          <p class="features__desc">{{ item.desc }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import aboutImg from "@/assets/images/illustrations/AboutImage.webp";
import saller from "@/assets/images/icons/SallersActive.svg";
import mopnthly from "@/assets/images/icons/MopnthlyProduduct.svg";
import customerActive from "@/assets/images/icons/CustomerActive.svg";
import anual from "@/assets/images/icons/AnualGross.svg";
import tom from "@/assets/images/illustrations/TomImage.svg";
import emma from "@/assets/images/illustrations/EmmaImage.svg";
import will from "@/assets/images/illustrations/WillImage.svg";
import free from "@/assets/images/icons/FreeDlivery.svg";
import custumerService from "@/assets/images/icons/CustomerService.svg";
import money from "@/assets/images/icons/MoneyBack.svg";
import twitter from "@/assets/images/logos/TwitterBlack.svg";
import insta from "@/assets/images/logos/InstagramBlack.svg";
import linkedin from "@/assets/images/logos/LinkedinBlack.svg";
export default Vue.extend({
  data() {
    return {
      aboutImg,
      stats: [
        {
          number: "10.5k",
          text: "Sellers active our site",
          icon: saller,
          highlight: false,
        },
        {
          number: "33k",
          text: "Monthly Product Sale",
          icon: mopnthly,
          highlight: true,
        },
        {
          number: "45.5k",
          text: "Customer active in our site",
          icon: customerActive,
          highlight: false,
        },
        {
          number: "25k",
          text: "Anual gross sale in our site",
          icon: anual,
          highlight: false,
        },
      ],
      team: [
        {
          id: 1,
          name: "Tom Cruise",
          role: "Founder & Chairman",
          image: tom,
        },
        {
          id: 2,
          name: "Emma Watson",
          role: "Managing Director",
          image: emma,
        },
        {
          id: 3,
          name: "Will Smith",
          role: "Product Designer",
          image: will,
        },
      ],
      socialIcons: [twitter, insta, linkedin],

      features: [
        {
          title: "FREE AND FAST DELIVERY",
          desc: "Free delivery for all orders over $140",
          icon: free,
        },
        {
          title: "24/7 CUSTOMER SERVICE",
          desc: "Friendly 24/7 customer support",
          icon: custumerService,
        },
        {
          title: "MONEY BACK GUARANTEE",
          desc: "We return money within 30 days",
          icon: money,
        },
      ],
    };
  },
});
</script>
<style scoped>
@import "@/assets/styles/pages/about.scss";
</style>
