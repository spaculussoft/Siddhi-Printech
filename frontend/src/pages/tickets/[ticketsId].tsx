import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';

import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { RichTextField } from '../../components/RichTextField';

import { update, fetch } from '../../stores/tickets/ticketsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditTickets = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    title: '',

    status: '',

    creation_date: new Date(),

    last_update_date: new Date(),

    details: '',

    attachments: [],

    customer: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { tickets } = useAppSelector((state) => state.tickets);

  const { ticketsId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: ticketsId }));
  }, [ticketsId]);

  useEffect(() => {
    if (typeof tickets === 'object') {
      setInitialValues(tickets);
    }
  }, [tickets]);

  useEffect(() => {
    if (typeof tickets === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = tickets[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [tickets]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: ticketsId, data }));
    await router.push('/tickets/tickets-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit tickets')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit tickets'}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='Title'>
                <Field name='title' placeholder='Title' />
              </FormField>

              <FormField label='Status' labelFor='status'>
                <Field name='Status' id='Status' component='select'>
                  <option value='open'>open</option>

                  <option value='closed'>closed</option>

                  <option value='pending'>pending</option>
                </Field>
              </FormField>

              <FormField label='CreationDate'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.creation_date
                      ? new Date(
                          dayjs(initialValues.creation_date).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({ ...initialValues, creation_date: date })
                  }
                />
              </FormField>

              <FormField label='LastUpdateDate'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.last_update_date
                      ? new Date(
                          dayjs(initialValues.last_update_date).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({
                      ...initialValues,
                      last_update_date: date,
                    })
                  }
                />
              </FormField>

              <FormField label='Details' hasTextareaHeight>
                <Field name='details' as='textarea' placeholder='Details' />
              </FormField>

              <FormField>
                <Field
                  label='Attachments'
                  color='info'
                  icon={mdiUpload}
                  path={'tickets/attachments'}
                  name='attachments'
                  id='attachments'
                  schema={{
                    size: undefined,
                    formats: undefined,
                  }}
                  component={FormFilePicker}
                ></Field>
              </FormField>

              <FormField label='Customer' labelFor='customer'>
                <Field
                  name='customer'
                  id='customer'
                  component={SelectField}
                  options={initialValues.customer}
                  itemRef={'customers'}
                  showField={'email'}
                ></Field>
              </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() => router.push('/tickets/tickets-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditTickets.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_TICKETS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditTickets;
