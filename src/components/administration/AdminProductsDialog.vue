<template>
  <v-dialog v-model="productsDialog" max-width="500px">

    <v-btn
      dark
      slot="activator"
      class="indigo lighten-1 white--text text-xs-center mb-2"
    >
      {{ $t('admin.productsTable.newProduct')}}
    </v-btn>

    <v-card>
      <v-card-title>
        <span class="headline">{{ $t('admin.productsTable.newProduct')}}</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>

            <v-flex xs12>
              <v-text-field
                :label="$t('admin.productsTable.name')"
                v-model="productForEdit.name"
              />
            </v-flex>

            <v-spacer />

            <v-flex xs12>
              <v-text-field
                :label="$t('admin.productsTable.price')"
                v-model="productForEdit.price"
              />
            </v-flex>

            <v-flex xs12>
              <a
                v-if="productForEdit.url"
                :href="productForEdit.url"
                target="_blank"
              >
                {{ $t('admin.productsTable.openFile') }}
              </a>

              <file-input
                accept="image/*"
                @input="getUploadedFile"
              />

            </v-flex>

          </v-layout>
        </v-container>
      </v-card-text>

      <v-card-actions>

        <v-spacer />

        <v-btn
          color="blue darken-1"
          flat
          @click="close"
        >
          {{ $t('common.close') }}
        </v-btn>

        <v-btn
          v-if="$store.getters.productsDialogEditMode"
          color="blue darken-1"
          flat
          @click="update"
        >
          {{ $t('common.update') }}
        </v-btn>
        <v-btn
          v-else
          color="blue darken-1"
          flat
          @click="add"
        >
          {{ $t('common.save') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import {db} from "@/main";
  import * as faker from 'faker';
  import {mapGetters} from 'vuex';
  import FileInput from "@/components/helpers/FileInput";

  export default {
    name: "admin-products-dialog",
    components: {FileInput},
    methods: {
      close () {
        this.$store.commit('toggleProductsDialog', {
          editMode: false,
          product: {
            id: null,
            name: '',
            price: '',
            url: '',
            file_id: ''
          }
        })
      },
      add () {
        this.productForEdit.id = faker.random.alphaNumeric(16);
        const product = Object.assign({}, this.productForEdit);
        product.createdAt = Date.now();
        db.collection('products').doc(this.productForEdit.id).set(product).then(() => {
          if (this.image) {
            this.$store.dispatch('pushFileToStorage', {fileToUpload: this.image, id: product.id}).then(() => {
              this._alertAndClose('saved');
            })
          } else {
            this._alertAndClose('saved');
          }
        });
      },
      update () {
        const product = Object.assign({}, this.productForEdit);
        db.collection('products').doc(product.id).update(product).then(() => {
          if (this.image) {
            if (product.url) {
              this.$store.dispatch('removeFile', product).then(() => {
                this.$store.dispatch('updateDeletedProduct', product.id);
              })
            }

            //submimos la nueva imagen
            this.$store.dispatch('pushFileToStorage', {fileToUpload: this.image, id: product.id}).then(() => {
              this._alertAndClose('updated');
            });
          } else {
            this._alertAndClose('updated');
          }
        })
      },
      getUploadedFile (e) {
        this.image = e;
      },
      _alertAndClose (action) {
        this.$store.commit('setAlertMessage', {
          show: true,
          type: 'success',
          message: this.$t(`messages.${action}`, {item: this.$t('common.product')}),
          timeout: 5000
        });
        this.close();
      }
    },
    computed: {
      productsDialog: {
        get () {
          return this.$store.getters.productsDialog;
        },
        set () {
          this.close();
        }
      },
      ...mapGetters(['productForEdit'])
    }
  }
</script>
