import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { useMutation } from "react-query";

import { fetch, FetchError, FetchResponse } from "../../utils/dataAccess";
import { InstallmentsDonation } from "../../types/InstallmentsDonation";

interface Props {
  installmentsdonation?: InstallmentsDonation;
}

interface SaveParams {
  values: InstallmentsDonation;
}

interface DeleteParams {
  id: string;
}

const saveInstallmentsDonation = async ({ values }: SaveParams) =>
  await fetch<InstallmentsDonation>(
    !values["@id"] ? "/installments_donations" : values["@id"],
    {
      method: !values["@id"] ? "POST" : "PUT",
      body: JSON.stringify(values),
    }
  );

const deleteInstallmentsDonation = async (id: string) =>
  await fetch<InstallmentsDonation>(id, { method: "DELETE" });

export const Form: FunctionComponent<Props> = ({ installmentsdonation }) => {
  const [, setError] = useState<string | null>(null);
  const router = useRouter();

  const saveMutation = useMutation<
    FetchResponse<InstallmentsDonation> | undefined,
    Error | FetchError,
    SaveParams
  >((saveParams) => saveInstallmentsDonation(saveParams));

  const deleteMutation = useMutation<
    FetchResponse<InstallmentsDonation> | undefined,
    Error | FetchError,
    DeleteParams
  >(({ id }) => deleteInstallmentsDonation(id), {
    onSuccess: () => {
      router.push("/installmentsdonations");
    },
    onError: (error) => {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    },
  });

  const handleDelete = () => {
    if (!installmentsdonation || !installmentsdonation["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    deleteMutation.mutate({ id: installmentsdonation["@id"] });
  };

  return (
    <div>
      <h1>
        {installmentsdonation
          ? `Edit InstallmentsDonation ${installmentsdonation["@id"]}`
          : `Create InstallmentsDonation`}
      </h1>
      <Formik
        initialValues={
          installmentsdonation
            ? {
                ...installmentsdonation,
              }
            : new InstallmentsDonation()
        }
        validate={() => {
          const errors = {};
          // add your validation logic here
          return errors;
        }}
        onSubmit={(values, { setSubmitting, setStatus, setErrors }) => {
          const isCreation = !values["@id"];
          saveMutation.mutate(
            { values },
            {
              onSuccess: () => {
                setStatus({
                  isValid: true,
                  msg: `Element ${isCreation ? "created" : "updated"}.`,
                });
                router.push("/installments_donations");
              },
              onError: (error) => {
                setStatus({
                  isValid: false,
                  msg: `${error.message}`,
                });
                if ("fields" in error) {
                  setErrors(error.fields);
                }
              },
              onSettled: () => {
                setSubmitting(false);
              },
            }
          );
        }}
      >
        {({
          values,
          status,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label
                className="form-control-label"
                htmlFor="installmentsdonation_payment"
              >
                payment
              </label>
              <input
                name="payment"
                id="installmentsdonation_payment"
                value={values.payment ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.payment && touched.payment ? " is-invalid" : ""
                }`}
                aria-invalid={
                  errors.payment && touched.payment ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="payment"
              />
            </div>
            <div className="form-group">
              <label
                className="form-control-label"
                htmlFor="installmentsdonation_status"
              >
                status
              </label>
              <input
                name="status"
                id="installmentsdonation_status"
                value={values.status ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.status && touched.status ? " is-invalid" : ""
                }`}
                aria-invalid={
                  errors.status && touched.status ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="status"
              />
            </div>
            <div className="form-group">
              <label
                className="form-control-label"
                htmlFor="installmentsdonation_donation"
              >
                donation
              </label>
              <input
                name="donation"
                id="installmentsdonation_donation"
                value={values.donation ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.donation && touched.donation ? " is-invalid" : ""
                }`}
                aria-invalid={
                  errors.donation && touched.donation ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="donation"
              />
            </div>
            <div className="form-group">
              <label
                className="form-control-label"
                htmlFor="installmentsdonation_amountPaid"
              >
                amountPaid
              </label>
              <input
                name="amountPaid"
                id="installmentsdonation_amountPaid"
                value={values.amountPaid ?? ""}
                type="number"
                step="0.1"
                placeholder=""
                className={`form-control${
                  errors.amountPaid && touched.amountPaid ? " is-invalid" : ""
                }`}
                aria-invalid={
                  errors.amountPaid && touched.amountPaid ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="amountPaid"
              />
            </div>
            <div className="form-group">
              <label
                className="form-control-label"
                htmlFor="installmentsdonation_amount_paid"
              >
                amount_paid
              </label>
              <input
                name="amount_paid"
                id="installmentsdonation_amount_paid"
                value={values.amount_paid ?? ""}
                type="number"
                step="0.1"
                placeholder=""
                className={`form-control${
                  errors.amount_paid && touched.amount_paid ? " is-invalid" : ""
                }`}
                aria-invalid={
                  errors.amount_paid && touched.amount_paid ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="amount_paid"
              />
            </div>
            {status && status.msg && (
              <div
                className={`alert ${
                  status.isValid ? "alert-success" : "alert-danger"
                }`}
                role="alert"
              >
                {status.msg}
              </div>
            )}
            <button
              type="submit"
              className="btn btn-success"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </form>
        )}
      </Formik>
      <Link href="/installmentsdonations">
        <a className="btn btn-primary">Back to list</a>
      </Link>
      {installmentsdonation && (
        <button className="btn btn-danger" onClick={handleDelete}>
          <a>Delete</a>
        </button>
      )}
    </div>
  );
};
