<template>
  <div class="photo-uploader-container">
    <div v-if="isLoading" class="photo-uploader-status">
      <SpinLoader class="photo-uploader-status-loader" :size="1.5" />
    </div>
    <div
      v-else-if="photo && photo.id"
      class="photo-uploader-view"
      :style="`background-image: url('${photo.path}');`"
    >
      <RoundedButton
        @click="$emit('remove')"
        variant="danger"
        is-close-button
        class="photo-uploader-remove"
      />
    </div>
    <b-form-file
      v-else
      @change="$emit('change', $event)"
      accept="image/jpeg, image/png, image/gif"
      class="photo-uploader"
      placeholder
    >
      <template #file-name>
        <div class="edit-form-background-image"></div>
      </template>
    </b-form-file>
  </div>
</template>

<script>
import SpinLoader from '@/components/ui/SpinLoader';
import RoundedButton from '@/components/ui/button/RoundedButton';

export default {
  props: {
    photo: Object,
    isLoading: Boolean,
  },

  components: {
    SpinLoader,
    RoundedButton,
  },
};
</script>

<style lang="scss">
@import '../../../sass/variables';

.photo-uploader-status,
.photo-uploader-view {
  display: block;
  position: relative;
  padding-top: calc(100% - 4px);
  border: 2px solid $border-color;
  border-radius: $border-radius-lg;
  overflow: hidden;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.photo-uploader-status {
  .photo-uploader-status-loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.photo-uploader-view {
  .photo-uploader-remove {
    position: absolute !important;
    top: 0.75rem;
    right: 0.75rem;
  }
}

.photo-uploader {
  display: block;
  position: relative;
  padding-top: 100%;

  input,
  label {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin-bottom: 0;
    height: auto;
    padding: 0;
    border-width: 0;
  }

  label {
    border: 2px solid $border-color;
    border-radius: $border-radius-lg;

    &::before,
    &::after {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      content: '' !important;
      background-image: none;
      background-color: $border-color;
      padding: 0;
      border-radius: 0;
    }

    &::after {
      border-left: none;
      width: 30%;
      height: 2px;
    }

    &::before {
      width: 2px;
      height: 30%;
    }
  }
}
</style>
