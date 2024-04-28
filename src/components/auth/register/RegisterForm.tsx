import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Grid } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";

import zod, { z } from "zod";
import FormInput from "../../common/inputs/FormField";

const registerSchema = zod
  .object({
    email: zod
      .string()
      .min(1, "Email field is required")
      .email("Not valid email"),
    password: zod.string().min(1, "Password field is required"),
    confirmPassword: zod.string().min(1, "Confirm password field is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
type RegisterInput = z.infer<typeof registerSchema>;
export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) });

  const onSubmit: SubmitHandler<RegisterInput> = async (data, event) => {
    event?.preventDefault();
    console.log(data);
  };
  return (
    <Grid
      container
      component={"form"}
      direction={"column"}
      onSubmit={handleSubmit(onSubmit)}
      gap={2}
      xs={12}
      md={4}
    >
      <FormInput
        label={"Email"}
        error={Boolean(errors.email)}
        variant="outlined"
        fullWidth
        errorMsg={errors.email}
        {...register("email")}
      />
      <FormInput
        label={"Password"}
        error={Boolean(errors.password)}
        variant="outlined"
        errorMsg={errors.password}
        fullWidth
        {...register("password")}
      />
      <FormInput
        label={"Confirm Password"}
        error={Boolean(errors.confirmPassword)}
        variant="outlined"
        errorMsg={errors.confirmPassword}
        {...register("confirmPassword")}
        fullWidth
      />
      <Button type="submit" variant="contained" fullWidth>
        Register
      </Button>
    </Grid>
  );
}
