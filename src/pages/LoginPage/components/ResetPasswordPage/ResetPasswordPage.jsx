import React, { useState } from "react";
import { TextField, Button, Container } from "@mui/material";
import axios from "axios";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";

const ResetPasswordPage = () => {
  const { token } = useParams(); // 从 URL 中获取重置密码令牌
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleResetPassword = async () => {
    try {
      if (!newPassword || !confirmPassword) {
        setError("Please enter both new and confirmed passwords.");
        return;
      }

      if (newPassword !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      // 发送密码重置请求到后端，包括重置密码令牌和新密码
      await axios.post("/api/reset-password", { token, newPassword });

      // 处理密码重置成功的逻辑
      // ...

    } catch (err) {
      setError("Error resetting password.");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#ffffff">
      <Container
        maxWidth="sm"
        sx={{
          borderRadius: "3px",
          padding: "25px 40px",
          boxShadow: "rgba(0,0,0,0.1) 0 0 10px",
        }}
      >
        <form>
          <h2 style={{ textAlign: "center", fontSize: "45px" }}>Reset Password</h2>
          <TextField
            label="New Password"
            variant="outlined"
            margin="normal"
            fullWidth
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            margin="normal"
            fullWidth
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleResetPassword}
            fullWidth
            style={{ margin: "20px auto 5px" }}
          >
            Reset Password
          </Button>

          {error && (
            <div style={{ textAlign: "center", color: "red" }}>
              {error}
            </div>
          )}
        </form>
      </Container>
    </Box>
  );
};

export default ResetPasswordPage;
