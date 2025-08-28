import styled from 'styled-components';
import FormRow from '../../ui/FormRow';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  tripFormSchema,
  type TripFormData,
  type TripFormSchema,
} from '../../schemas/tripSchema';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Input from '../../ui/Input';
import Textarea from '../../ui/TextArea';
import { useTrips } from '../../api/useTrips';
import Select from '../../ui/Select';
import { type ChangeEvent } from 'react';
import ButtonText from '../../ui/ButtonText';
import { useMoveBack } from '../../api/hooks/useBack';
import TripStatus from '../../ui/TripStatus';

type Props = {
  trip: Trip;
  tripCreated?: () => void;
  tripUpdated?: () => void;
};

const FormContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  width: 100%;
`;

// const FormSection = styled.div`
//   border: 1px solid var(--color-grey-800);
//   padding: 2rem;
//   border-radius: 5px;
//   background-color: var(--color-grey-1000);
// `;

export default function TripForm({ trip, tripCreated, tripUpdated }: Props) {
  const navigate = useNavigate();
  const { createTrip, updateTrip, reopenTrip, closeTrip } = useTrips();
  const moveBack = useMoveBack();

  const defaultvalues: TripFormSchema = {
    id: trip.id,
    travellerName: trip.travellerName,
    fromDate: trip.fromDate,
    toDate: trip.toDate,
    location: trip.location,
    description: trip.description,
    approvedDate: trip.approvedDate,
    statusId: 1,
    fiduciary: 'MCSO',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    setValue,
  } = useForm<TripFormSchema>({
    resolver: yupResolver(tripFormSchema),
    defaultValues: defaultvalues,
  });

  const onSubmit = async (data: TripFormData) => {
    try {
      if (data.id === 0) {
        await createTrip.mutate(data, {
          onSuccess: (id) => navigate(`/trips/${id}`),
        });
        tripCreated?.();
      } else {
        await updateTrip.mutate(data);
        tripUpdated?.();
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  function onError<TripFromData>(errors: TripFromData | undefined) {
    console.log('errors', errors, getValues());
  }

  const selectionChanged = (e: ChangeEvent<HTMLSelectElement>) => {
    trip.fiduciary = e.target.value;
    setValue('fiduciary', e.target.value);
  };

  function getStatus(statusId: number) {
    return statusId == 1 ? 'Open' : 'Closed';
  }

  // useEffect(() => {
  //   setValue('fiduciary', trip.fiduciary);
  // }, [setValue, trip.fiduciary]);

  return (
    <>
      <div className="flex justify-between w-[100] mb-2 ">
        <div className="flex gap-54">
          <div className="flex flex-col ">
            <div>{trip.id == 0 ? 'Create Trip' : 'Edit Trip'}</div>
            {trip.id !== 0 && (
              <div className="text-sm w-[4rem] mt-2">
                <TripStatus status={getStatus(trip.statusId)}>
                  {getStatus(trip.statusId)}
                </TripStatus>
              </div>
            )}
          </div>
          {trip.id > 0 && (
            <div className="self-end">
              {trip.statusId == 2 && (
                <>
                  <Button
                    variation="danger"
                    children="Reopen Trip"
                    size="medium"
                    style={{ height: '50px', width: '140px' }}
                    onClick={() => reopenTrip.mutate(trip.id)}
                  ></Button>
                </>
              )}
              {trip.statusId == 1 && (
                <Button
                  variation="danger"
                  children="Close Trip"
                  size="medium"
                  style={{ height: '50px', width: '140px' }}
                  onClick={() => closeTrip.mutate(trip.id)}
                ></Button>
              )}
            </div>
          )}
        </div>
        <div>
          <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
        </div>
      </div>
      <FormContainer>
        <Form onSubmit={handleSubmit(onSubmit, onError)} type="regular">
          {trip.id !== 0 && (
            <FormRow label="Trip Id" id="id">
              <Input
                type="text"
                disabled={true}
                value={trip.id}
                style={{ backgroundColor: 'transparent', padding: 0 }}
              ></Input>
            </FormRow>
          )}

          <FormRow
            label="Traveller Name"
            id="travellerName"
            error={errors?.travellerName?.message}
            useMessage={true}
          >
            <Input
              type="text"
              disabled={trip.statusId == 2}
              id="travellerName"
              defaultValue={trip.travellerName}
              {...register('travellerName')}
            ></Input>
          </FormRow>
          <div className="my-5"></div>
          <FormRow
            label="Trip Start Date"
            id="fromDate"
            error={errors?.fromDate?.message}
            useMessage={true}
          >
            <Controller
              control={control}
              name="fromDate"
              render={({ field }) => (
                <DatePicker
                  {...register('fromDate')}
                  id="fromDate"
                  selected={field.value ? new Date(field.value) : null}
                  dateFormat="MM/dd/yyyy"
                  onBlur={field.onBlur} // Important for validation
                  onChange={(date) => {
                    console.log('date', date);
                    field.onChange(date);
                  }}
                  className="border border-gray-700 rounded-sm py-[.5rem] px-[.9rem] text-end w-[15rem]"
                  disabled={trip.statusId == 2}
                />
              )}
            ></Controller>
          </FormRow>
          <FormRow
            label="Trip End Date"
            id="toDate"
            error={errors?.fromDate?.message}
            useMessage={true}
          >
            <Controller
              control={control}
              name="toDate"
              render={({ field }) => (
                <DatePicker
                  {...register('toDate')}
                  id="toDate"
                  selected={field.value ? new Date(field.value) : null}
                  dateFormat="MM/dd/yyyy"
                  onBlur={field.onBlur} // Important for validation
                  onChange={(date) => {
                    console.log('date', date);
                    field.onChange(date);
                  }}
                  className="border border-gray-700 rounded-sm py-[.5rem] px-[.9rem] text-end w-[15rem]"
                  disabled={trip.statusId == 2}
                />
              )}
            ></Controller>
          </FormRow>
          <div className="my-5"></div>

          <FormRow
            label="Approved Date"
            id="approvedDate"
            error={errors?.approvedDate?.message}
            useMessage={true}
          >
            <Controller
              control={control}
              name="approvedDate"
              render={({ field }) => (
                <DatePicker
                  {...register('approvedDate')}
                  id="approvedDate"
                  selected={field.value ? new Date(field.value) : null}
                  dateFormat="MM/dd/yyyy"
                  onBlur={field.onBlur} // Important for validation
                  onChange={(date) => {
                    console.log('date', date);
                    field.onChange(date);
                  }}
                  className="border border-gray-700 rounded-sm py-[.5rem] px-[.9rem] text-end w-[15rem]"
                  disabled={trip.statusId == 2}
                />
              )}
            ></Controller>
          </FormRow>
          <FormRow
            label="Location"
            id="location"
            error={errors?.location?.message}
            useMessage={true}
          >
            <Input
              width={'15rem'}
              type="text"
              id="location"
              defaultValue={trip.location}
              {...register('location')}
              disabled={trip.statusId == 2}
            ></Input>
          </FormRow>
          <FormRow
            label="Description"
            id="desciption"
            error={errors?.description?.message}
            useMessage={true}
          >
            <Textarea
              id="description"
              defaultValue={trip.description}
              {...register('description')}
              disabled={trip.statusId == 2}
            ></Textarea>
          </FormRow>
          <FormRow label="Fiduciary" id="fiduciary">
            <Select
              {...register('fiduciary')}
              id="fiduciary"
              type="dark"
              onChange={selectionChanged}
              options={[
                { value: 'MCSO', text: 'MCSO' },
                { value: 'CAM', text: 'CAM' },
              ]}
              disabled={trip.statusId == 2}
            ></Select>
          </FormRow>
        </Form>
      </FormContainer>
      {trip.statusId == 1 && (
        <div className="mt-4 flex gap-4">
          <Button
            variation="secondary"
            children="Cancel"
            size="medium"
            type="button"
            disabled={createTrip.isPending || updateTrip.isPending}
            onClick={() => navigate(-1)}
          ></Button>
          <Button
            variation="primary"
            children="Save"
            size="medium"
            type="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={createTrip.isPending || updateTrip.isPending}
          ></Button>
        </div>
      )}
    </>
  );
}
