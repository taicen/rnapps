/* eslint-disable react/prefer-stateless-function */
import React, { Fragment } from 'react';
import { View } from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';

import { confirmEmail } from '../../../redux/auth';

import { FormInput, Checkbox, Button, FieldDatePicker } from '../../../components/ui';
import SelectField from '../../../components/ui/SelectField';

import { secondStepValidate as validate } from './validate';

function RenderCheckbox({ input, meta: { error, touched }, ...props }) {
  return (
    <Fragment>
      <Checkbox
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        onChange={value => {
          input.onChange(Number(value));
        }}
        error={error && touched}
      />
    </Fragment>
  );
}

const gender = [
  {
    label: 'Мужской',
    value: 'man',
  },
  {
    label: 'Женский',
    value: 'female',
  },
];

const dateNow = new Date();
let month = ('0' + (dateNow.getMonth() + 1)).slice(-2);
const formatNow = `${dateNow.getFullYear() - 16}-${month}-${dateNow.getDate()}`;

class SecondStep extends React.Component {
  state = {
    errorEmail: null,
  };

  // componentDidMount(){}

  componentDidUpdate(prevProps) {
    const { noneIsRezident, change } = this.props;

    if (prevProps.noneIsRezident !== noneIsRezident) {
      if (noneIsRezident) {
        change('iin', undefined);
      } else {
        change('passport', undefined);
      }
    }
  }

  _handleCheckEmail = () => {
    const { emailChk } = this.props;

    confirmEmail({ email: emailChk.trim() }).then(res => {
      //console.log('>>>>>>>>>>', res.success);
      if (!res.success) {
        this.setState({ errorEmail: res.message_ru });
      } else {
        this.setState({ errorEmail: null });
      }
    });
  };

  handleSubmit = () => {
    const { handleNextStep } = this.props;
    handleNextStep();
  };

  render() {
    const { handleSubmit, noneIsRezident } = this.props;
    return (
      <View style={{ width: '100%' }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
          {noneIsRezident ? (
            <Field
              component={FormInput}
              unControlled
              mask="N [00000000]"
              name="passport"
              label="Номер паспорта"
              width={120}
              containerPropsStyle={{
                width: 120,
              }}
            />
          ) : (
            <Field
              component={FormInput}
              unControlled
              mask="[0000] [0000] [0000]"
              name="iin"
              label="ИИН"
              width={120}
              containerPropsStyle={{
                width: 120,
              }}
            />
          )}
          <Field
            name="nonRezidentRK"
            component={RenderCheckbox}
            label="Нерезидент РК"
            style={{ marginLeft: 20 }}
          />
        </View>

        <Field
          width="100%"
          component={FieldDatePicker}
          name="birthday"
          label="Год рождения"
          mode="date"
          placeholder="Выберите дату"
          androidMode="calendar"
          formatDate="YYYY-MM-DD"
          minDate="1950-01-01"
          maxDate={formatNow}
        />

        <Field
          component={SelectField}
          placeholder="Укажите пол"
          name="gender"
          label="Пол"
          defaultValue
          items={gender}
          key={() => {
            gender.map(key => {
              return key.value;
            });
          }}
        />

        <Field width="100%" component={FormInput} name="first_name" label="Имя" />
        <Field component={FormInput} name="last_name" label="Фамилия" />
        <Field
          component={FormInput}
          name="email"
          label="Эл. адрес"
          errors={this.state.errorEmail}
          onBlur={() => {
            this._handleCheckEmail();
          }}
        />
        <Field
          component={FormInput}
          name="password"
          label="Пароль"
          width={190}
          passwordInput
          hint="Пароль должен иметь не меньше 8 символов, содержит цифру или символ"
        />
        <Field
          component={FormInput}
          name="repeatPassword"
          label="Повторите пароль"
          width={190}
          passwordInput
        />

        <Field
          name="policy1"
          component={RenderCheckbox}
          label="Принимаю пользовательское соглашение "
          style={{ marginTop: 30 }}
          linkUrl="https://velocity.rocketfirm.net/media/docs/dogovor_ru.doc"
          linkLabel="Публичный договор"
        />

        <Field
          name="notification"
          component={RenderCheckbox}
          label="Получать уведомления об акциях и рекламных предложениях"
        />

        <Field
          name="policy3"
          component={RenderCheckbox}
          label="Мне уже 16 и я согласен с "
          linkUrl="https://velobike.kz/documents/dogovor01052019/dogovor_ru.doc"
          linkLabel="«Договором об аренде»"
        />

        <Button
          onPress={handleSubmit(this.handleSubmit)}
          style={{ marginTop: 30 }}
          disabled={this.state.errorEmail}
          title="Далее"
        />
      </View>
    );
  }
}

const formSelector = formValueSelector('registration');

export default compose(
  reduxForm({
    form: 'registration',
    destroyOnUnmount: true,
    forceUnregisterOnUnmount: true,
    validate,
  }),
  connect(state => ({
    noneIsRezident: formSelector(state, 'nonRezidentRK'),
    emailChk: formSelector(state, 'email'),
  })),
)(SecondStep);
