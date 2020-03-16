import React, { Fragment } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import ImagePickerLayout from '../../../components/layouts/ImagePickerLayout';
import { DocsIcon, SelfieDocIcon } from '../../../components/svg';
import { ImagePickerComponent, Button } from '../../../components/ui';
import { thirdStepValidate as validate } from './validate';

const ImageField = ({ input, meta, ...props }) => {
  return (
    <ImagePickerComponent
      {...props}
      error={meta.error}
      image={input.value}
      action={response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          console.log('🐞: ImageField -> response', response);
          // const source = `data:${response.type};base64,${response.data}`;
          const file = {
            ...response,
            name: response.fileName,
            size: response.fileSize,
          };
          input.onChange(file);
        }
        // if (!response.error) {
        //   console.log('🐞: ImageField -> response', response);
        //   const source = `data:${response.type};base64,${response.data}`;
        //   input.onChange(source);
        // }
      }}
    />
  );
};

function ThirdStep({ handleSubmit, lastSubmit, loading }) {
  return (
    <Fragment>
      <ImagePickerLayout title="Для завершения регистрации загрузите документы подтверждающее личность.">
        <Field
          component={ImageField}
          icon={<DocsIcon front />}
          name="photo_2"
          title="Лицевая сторона"
          pickStyle="launchImageLibrary"
        />
        <Field
          component={ImageField}
          icon={<DocsIcon />}
          name="photo_3"
          title="Обратная сторона"
          pickStyle="launchImageLibrary"
        />
        <Field
          wide
          component={ImageField}
          icon={<SelfieDocIcon />}
          name="photo_1"
          title="Селфи с удостоверением личности"
          pickStyle="launchCamera"
        />
      </ImagePickerLayout>

      <Button
        onPress={handleSubmit(lastSubmit)}
        disabled={loading}
        style={{ marginTop: 30 }}
        title="Зарегистрироваться"
      />
    </Fragment>
  );
}

export default compose(
  connect(state => ({
    loading: state.auth.loading,
  })),
  reduxForm({
    destroyOnUnmount: true,
    forceUnregisterOnUnmount: true,
    form: 'registration',
    validate,
  }),
)(ThirdStep);
