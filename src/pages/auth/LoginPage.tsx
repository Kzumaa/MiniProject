import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/utils/validation";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/providers/hooks/useAuth";
import { useToast } from "@/providers/hooks/useToast";
import RHFForm from "@/components/common/RHFForm";
import RHFTextField from "@/components/common/Fields/RHFTextField";

type LoginForm = { username: string; password: string };

export default function LoginPage() {
  const methods = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });
  const { user, login, loading } = useAuth();
  const { show } = useToast();

  if (user) return <Navigate to="/" replace />;

  const onSubmit = async (values: LoginForm) => {
    try {
      await login(values.username, values.password);
      show("Logged in", "success");
    } catch (e: any) {
      show(e.message || "Login failed", "error");
    }
  };

  return (
    <Box sx={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <Card sx={{ minWidth: 360 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Login
          </Typography>
          <RHFForm methods={methods} onSubmit={onSubmit}>
            <Stack spacing={2}>
              <RHFTextField name="username" label="Username" />
              <RHFTextField name="password" label="Password" type="password" />
              <Button type="submit" variant="contained" disabled={loading}>
                Login
              </Button>
            </Stack>
          </RHFForm>
        </CardContent>
      </Card>
    </Box>
  );
}
