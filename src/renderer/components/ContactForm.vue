<template>
  <ValidationObserver ref="observer" v-slot="{ invalid }">
    <b-form @submit.prevent="onSubmit" novalidate>
      <b-form-group label="First Name">
        <ValidationProvider name="firstName" rules="required" v-slot="{ errors }">
          <b-form-input
            type="text"
            :state="errors.length == 0"
            v-model="form.firstName"
            required
            placeholder="First Name"
            name="firstName"
          ></b-form-input>
          <b-form-invalid-feedback :state="errors.length == 0">First name is requied.</b-form-invalid-feedback>
        </ValidationProvider>
      </b-form-group>
      <b-form-group label="Last Name">
        <ValidationProvider name="lastName" rules="required" v-slot="{ errors }">
          <b-form-input
            type="text"
            :state="errors.length == 0"
            v-model="form.lastName"
            required
            placeholder="Last Name"
            name="lastName"
          ></b-form-input>
          <b-form-invalid-feedback :state="errors.length == 0">Last name is requied.</b-form-invalid-feedback>
        </ValidationProvider>
      </b-form-group>
      <b-form-group label="Address">
        <ValidationProvider name="addressLineOne" rules="required" v-slot="{ errors }">
          <b-form-input
            type="text"
            :state="errors.length == 0"
            v-model="form.addressLineOne"
            required
            placeholder="Address"
            name="addressLineOne"
          ></b-form-input>
          <b-form-invalid-feedback :state="errors.length == 0">Address is required.</b-form-invalid-feedback>
        </ValidationProvider>
      </b-form-group>
      <b-form-group label="City">
        <ValidationProvider name="city" rules="required" v-slot="{ errors }">
          <b-form-input
            type="text"
            :state="errors.length == 0"
            v-model="form.city"
            required
            placeholder="City"
            name="city"
          ></b-form-input>
          <b-form-invalid-feedback :state="errors.length == 0">City is required.</b-form-invalid-feedback>
        </ValidationProvider>
      </b-form-group>
      <b-form-group label="Postal Code">
        <ValidationProvider
          name="postalCode"
          rules="required|postal_code:country"
          v-slot="{ errors }"
        >
          <b-form-input
            type="text"
            :state="errors.length == 0"
            v-model="form.postalCode"
            required
            placeholder="Postal Code"
            name="postalCode"
          ></b-form-input>
          <b-form-invalid-feedback :state="errors.length == 0">Postal code is requied.</b-form-invalid-feedback>
        </ValidationProvider>
      </b-form-group>
      <b-form-group label="Country">
        <ValidationProvider name="country" rules="required" v-slot="{ errors }">
          <b-form-select
            :options="countries"
            :state="errors.length == 0"
            v-model="form.country"
            required
            placeholder="Country"
            name="country"
          ></b-form-select>
          <b-form-invalid-feedback :state="errors.length == 0">Country is requied.</b-form-invalid-feedback>
        </ValidationProvider>
      </b-form-group>
      <b-form-group label="Email">
        <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
          <b-form-input
            type="text"
            :state="errors.length == 0"
            v-model="form.email"
            required
            placeholder="Email"
            name="email"
          ></b-form-input>
          <b-form-invalid-feedback :state="errors.length == 0">{{errors.join('. ')}}</b-form-invalid-feedback>
        </ValidationProvider>
      </b-form-group>
      <b-form-group label="Phone">
        <ValidationProvider name="phone" rules="required|phone:country" v-slot="{ errors }">
          <b-form-input
            type="text"
            :state="errors.length == 0"
            v-model="form.phone"
            required
            placeholder="Phone"
            name="phone"
          ></b-form-input>
          <b-form-invalid-feedback :state="errors.length == 0">{{errors.join('. ')}}</b-form-invalid-feedback>
        </ValidationProvider>
      </b-form-group>
      <b-form-group label="Age">
        <ValidationProvider
          name="age"
          rules="required|min_value:0|max_value:200"
          v-slot="{ errors }"
        >
          <b-form-input
            type="text"
            :state="errors.length == 0"
            v-model="form.age"
            required
            placeholder="Age"
            name="age"
          ></b-form-input>
          <b-form-invalid-feedback :state="errors.length == 0">{{errors.join('. ')}}</b-form-invalid-feedback>
        </ValidationProvider>
      </b-form-group>
<b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger" @click="cancel()">Cancel</b-button>
    </b-form>
  </ValidationObserver>
</template>
<script>
import { COUNTRIES } from "@/helpers/exports";
import { requestsMixin } from "@/mixins/requestsMixin";
export default {
  name: "ContactForm",
  mixins: [requestsMixin],
  props: {
    edit: Boolean,
    contact: Object
  },
  methods: {
    async onSubmit() {
      const isValid = await this.$refs.observer.validate();
      if (!isValid) {
        return;
      }
if (this.edit) {
        await this.editContact(this.form);
      } else {
        await this.addContact(this.form);
      }
      const response = await this.getContacts();
      this.$store.commit("setContacts", response.data);
      this.$emit("saved");
    },
    cancel() {
      this.$emit("cancelled");
    }
  },
  data() {
    return {
      form: {},
      countries: COUNTRIES.map(c => ({ value: c.name, text: c.name }))
    };
  },
  watch: {
    contact: {
      handler(c) {
        this.form = c || {};
      },
      deep: true,
      immediate: true
    }
  }
};
</script>
