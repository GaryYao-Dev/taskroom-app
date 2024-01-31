import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Snackbar, Alert } from "@mui/material";
import axios from 'axios';
import Box from "@mui/material/Box";
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('info');
  const navigate = useNavigate();

  const sendResetPasswordEmail = async (toEmail) => {
    try {
      const response = await axios.post('/api/send-reset-email', { email: toEmail });

      setSuccessMessage(response.data.message);
      setAlertSeverity('success');
      setAlertOpen(true);
    } catch (err) {
      setError('Error in sending email verification');
      setAlertSeverity('error');
      setAlertOpen(true);
    }
  };

  const handleSendResetEmail = async () => {
    try {
      if (!email) {
        setError('Please enter your email address!');
        setAlertSeverity('error');
        setAlertOpen(true);
        return;
      }

      // 调用发送重置密码邮件的函数
      await sendResetPasswordEmail(email);
    } catch (err) {
      setError('Error in sending email verification');
      setAlertSeverity('error');
      setAlertOpen(true);
    }
  };

  useEffect(() => {
    if (successMessage === "Email sent successfully!") {
      // 如果成功消息为"Email sent successfully!"，则重定向到登录页面
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }
  }, [successMessage, navigate]);

  const handleAlertClose = () => {
    setAlertOpen(false);
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
          <h2 style={{ textAlign: "center", fontSize: "45px" }}>Forgot Password</h2>
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleSendResetEmail}
            fullWidth
            style={{ margin: "20px auto 5px" }}
          >
            Send reset password email
          </Button>

          <Snackbar
            open={alertOpen}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            autoHideDuration={5000}
            onClose={handleAlertClose}
          >
            <Alert severity={alertSeverity}>{error || successMessage}</Alert>
          </Snackbar>
        </form>
      </Container>
    </Box>
  );
};

export default ForgotPasswordPage;
