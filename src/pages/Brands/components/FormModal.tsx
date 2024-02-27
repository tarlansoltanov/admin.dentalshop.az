import { useEffect, useState } from "react";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "@/store";

// Reactstrap
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Row,
  Col,
  Label,
  Input,
  FormFeedback,
  Alert,
  Spinner,
  Button,
} from "reactstrap";

// Yup and Formik for validation
import * as Yup from "yup";
import { useFormik } from "formik";

// Actions
import { createBrand, updateBrand } from "@/store/actions";

interface Props {
  data: any;
  show: boolean;
  isEdit: boolean;
  toggle: () => void;
  handleSubmit: (formData: any) => void;
}

const FormModal = ({ data, show, isEdit, toggle, handleSubmit }: Props) => {
  const title = isEdit ? "Marka məlumatlarını redaktə et" : "Marka əlavə Et";

  const { status, errors } = useSelector((state: RootState) => state.brand);

  const [alertError, setAlertError] = useState<string>("");

  // Validation
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: (data && data.name) || "",
      photo: (data && data.photo) || "",
      is_main: (data && data.is_main) || false,
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Zəhmət olmasa ad daxil edin!"),
      photo: Yup.string().required("Zəhmət olmasa şəkil yükləyin!"),
      is_main: Yup.boolean(),
    }),

    onSubmit: (values) => {
      const formData = new FormData();

      // Name
      if (!data || values["name"] !== data["name"]) formData.append("name", values["name"]);

      // Photo
      if (!data || values["photo"] !== data["photo"]) formData.append("photo", values["photo"]);

      // Is Main
      formData.append("is_main", values["is_main"]);

      handleSubmit(formData);
    },
  });

  // Success
  useEffect(() => {
    if (show && status) {
      if (
        ((isEdit && status.lastAction === updateBrand.typePrefix) ||
          (!isEdit && status.lastAction === createBrand.typePrefix)) &&
        status.success
      ) {
        validation.resetForm();
        toggle();
      }
    }
  }, [status]);

  // Failure
  useEffect(() => {
    if (show && status.failure) {
      if (errors && errors.response && errors.response.status === 400) {
        validation.setErrors({ ...validation.errors, ...errors.response.data });
      } else {
        setAlertError("Əməliyyat zamanı xəta baş verdi!");
      }
    }
  }, [errors]);

  return (
    <Modal isOpen={show} toggle={toggle}>
      <ModalHeader toggle={toggle} tag="h4">
        {title}
      </ModalHeader>

      {alertError && (
        <Alert color="danger" className="text-center m-3">
          {alertError}
        </Alert>
      )}

      <ModalBody>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
          }}>
          <Row>
            {/* Photo */}
            <Col className="col-12 mb-3">
              <Label className="form-label">Logo</Label>
              {validation.values.photo && (
                <img
                  className="d-block mb-2 object-fit-cover"
                  src={
                    typeof validation.values.photo === "object"
                      ? URL.createObjectURL(validation.values.photo)
                      : validation.values.photo
                  }
                  alt="Photo"
                  style={{ padding: "2px", margin: "2px", width: "10rem" }}
                />
              )}
              <Input
                name="photo"
                type="file"
                placeholder="Şəkil daxil edin"
                onChange={(e) => {
                  if (e.currentTarget.files && e.currentTarget.files.length > 0)
                    validation.setFieldValue("photo", e.currentTarget.files[0]);
                }}
                onBlur={validation.handleBlur}
                value={undefined}
                invalid={validation.touched.photo && validation.errors.photo ? true : false}
              />
              {validation.touched.photo && validation.errors.photo ? (
                <FormFeedback type="invalid">{validation.errors.photo.toString()}</FormFeedback>
              ) : null}
            </Col>
          </Row>

          <Row>
            {/* Name */}
            <Col className="col-8 mb-3">
              <Label>Ad</Label>

              <Input
                type="text"
                name="name"
                placeholder="Ad daxil edin"
                onBlur={validation.handleBlur}
                onChange={validation.handleChange}
                value={validation.values.name}
                invalid={validation.touched.name && validation.errors.name ? true : false}
              />

              {validation.touched.name && validation.errors.name ? (
                <FormFeedback type="invalid">{validation.errors.name.toString()}</FormFeedback>
              ) : null}
            </Col>

            {/* Is Main */}
            <Col className="col-4 mb-4" style={{ alignSelf: "flex-end" }}>
              <div className="form-check form-switch form-switch-lg">
                <Label className="form-check-label">Əsas</Label>

                <Input
                  type="checkbox"
                  name="is_main"
                  className="form-check-input"
                  onBlur={validation.handleBlur}
                  onChange={validation.handleChange}
                  checked={validation.values.is_main}
                />
              </div>
            </Col>
          </Row>

          <Row>
            {/* Submit */}
            <Col className="text-end">
              <Button color="success" type="submit">
                {status && status.loading ? (
                  <Spinner color="primary" size="sm" className="mr-1" />
                ) : isEdit ? (
                  "Yadda Saxla"
                ) : (
                  "Əlavə et"
                )}
              </Button>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default FormModal;
