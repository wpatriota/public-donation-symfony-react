import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Field, FieldArray, Formik } from "formik";
import { useMutation } from "react-query";

import { fetch, FetchError, FetchResponse } from "../../utils/dataAccess";
import { Donation } from "../../types/Donation";

interface Props {
  donation?: Donation;
}

interface SaveParams {
  values: Donation;
}

interface DeleteParams {
  id: string;
}

const saveDonation = async ({ values }: SaveParams) =>
  await fetch<Donation>(!values["@id"] ? "/donations" : values["@id"], {
    method: !values["@id"] ? "POST" : "PUT",
    body: JSON.stringify(values),
  });

const deleteDonation = async (id: string) =>
  await fetch<Donation>(id, { method: "DELETE" });

export const Form: FunctionComponent<Props> = ({ donation }) => {
  const [, setError] = useState<string | null>(null);
  const router = useRouter();

  const saveMutation = useMutation<
    FetchResponse<Donation> | undefined,
    Error | FetchError,
    SaveParams
  >((saveParams) => saveDonation(saveParams));

  const deleteMutation = useMutation<
    FetchResponse<Donation> | undefined,
    Error | FetchError,
    DeleteParams
  >(({ id }) => deleteDonation(id), {
    onSuccess: () => {
      router.push("/donations");
    },
    onError: (error) => {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    },
  });

  const handleDelete = () => {
    if (!donation || !donation["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    deleteMutation.mutate({ id: donation["@id"] });
  };

  return (
    <div>
      <h1>
        {donation ? `Edit Donation ${donation["@id"]}` : `Create Donation`}
      </h1>
      <Formik
        initialValues={
          donation
            ? {
                ...donation,
              }
            : new Donation()
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
                router.push("/donations");
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
              <label className="form-control-label" htmlFor="donation_payment">
                payment
              </label>
              <input
                name="payment"
                id="donation_payment"
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
              <label className="form-control-label" htmlFor="donation_donor">
                donor
              </label>
              <input
                name="donor"
                id="donation_donor"
                value={values.donor ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.donor && touched.donor ? " is-invalid" : ""
                }`}
                aria-invalid={
                  errors.donor && touched.donor ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="donor"
              />
            </div>
            <div className="form-group">
              <div className="form-control-label">installmentsDonations</div>
              <FieldArray
                name="installmentsDonations"
                render={(arrayHelpers) => (
                  <div id="donation_installmentsDonations">
                    {values.installmentsDonations &&
                    values.installmentsDonations.length > 0 ? (
                      values.installmentsDonations.map(
                        (item: any, index: number) => (
                          <div key={index}>
                            <Field name={`installmentsDonations.${index}`} />
                            <button
                              type="button"
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              -
                            </button>
                            <button
                              type="button"
                              onClick={() => arrayHelpers.insert(index, "")}
                            >
                              +
                            </button>
                          </div>
                        )
                      )
                    ) : (
                      <button
                        type="button"
                        onClick={() => arrayHelpers.push("")}
                      >
                        Add
                      </button>
                    )}
                  </div>
                )}
              />
            </div>
            <div className="form-group">
              <label
                className="form-control-label"
                htmlFor="donation_donationValue"
              >
                donationValue
              </label>
              <input
                name="donationValue"
                id="donation_donationValue"
                value={values.donationValue ?? ""}
                type="number"
                step="0.1"
                placeholder=""
                className={`form-control${
                  errors.donationValue && touched.donationValue
                    ? " is-invalid"
                    : ""
                }`}
                aria-invalid={
                  errors.donationValue && touched.donationValue
                    ? "true"
                    : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="donationValue"
              />
            </div>
            <div className="form-group">
              <label
                className="form-control-label"
                htmlFor="donation_donation_value"
              >
                donation_value
              </label>
              <input
                name="donation_value"
                id="donation_donation_value"
                value={values.donation_value ?? ""}
                type="number"
                step="0.1"
                placeholder=""
                className={`form-control${
                  errors.donation_value && touched.donation_value
                    ? " is-invalid"
                    : ""
                }`}
                aria-invalid={
                  errors.donation_value && touched.donation_value
                    ? "true"
                    : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="donation_value"
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
      <Link href="/donations">
        <a className="btn btn-primary">Back to list</a>
      </Link>
      {donation && (
        <button className="btn btn-danger" onClick={handleDelete}>
          <a>Delete</a>
        </button>
      )}
    </div>
  );
};
