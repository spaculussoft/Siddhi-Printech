import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/categories/categoriesSlice';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';
import LayoutAuthenticated from '../../layouts/Authenticated';
import { getPageTitle } from '../../config';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import SectionMain from '../../components/SectionMain';
import CardBox from '../../components/CardBox';
import BaseButton from '../../components/BaseButton';
import BaseDivider from '../../components/BaseDivider';
import { mdiChartTimelineVariant } from '@mdi/js';
import { SwitchField } from '../../components/SwitchField';
import FormField from '../../components/FormField';

const CategoriesView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.categories);

  const { id } = router.query;

  function removeLastCharacter(str) {
    console.log(str, `str`);
    return str.slice(0, -1);
  }

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View categories')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View categories')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Name</p>
            <p>{categories?.name}</p>
          </div>

          <FormField label='IsActive'>
            <SwitchField
              field={{ name: 'is_active', value: categories?.is_active }}
              form={{ setFieldValue: () => null }}
              disabled
            />
          </FormField>

          <>
            <p className={'block font-bold mb-2'}>
              Category_questions Category
            </p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Text</th>

                      <th>Type</th>

                      <th>Options</th>

                      <th>IsMandatory</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.category_questions_category &&
                      Array.isArray(categories.category_questions_category) &&
                      categories.category_questions_category.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/category_questions/category_questions-view/?id=${item.id}`,
                              )
                            }
                          >
                            <td data-label='text'>{item.text}</td>

                            <td data-label='type'>{item.type}</td>

                            <td data-label='options'>{item.options}</td>

                            <td data-label='is_mandatory'>
                              {dataFormatter.booleanFormatter(
                                item.is_mandatory,
                              )}
                            </td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!categories?.category_questions_category?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Products Category</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>

                      <th>Description</th>

                      <th>Price</th>

                      <th>Stock</th>

                      <th>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.products_category &&
                      Array.isArray(categories.products_category) &&
                      categories.products_category.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/products/products-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='name'>{item.name}</td>

                          <td data-label='description'>{item.description}</td>

                          <td data-label='price'>{item.price}</td>

                          <td data-label='stock'>{item.stock}</td>

                          <td data-label='type'>{item.type}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!categories?.products_category?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/categories/categories-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

CategoriesView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_CATEGORIES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default CategoriesView;
