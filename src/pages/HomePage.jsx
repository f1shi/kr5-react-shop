import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <main className="app-main">
      <Paper elevation={2} sx={{ p: 4 }}>
        <Box sx={{ display: 'grid', gap: 2 }}>
          <Typography variant="h4" component="h2">
            Учебный интернет-магазин на React
          </Typography>
          <Typography color="text.secondary">
            SPA-версия интернет-магазина электроники, который ранее был реализован на HTML, CSS и JavaScript.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button component={Link} to="/catalog" variant="contained">
              Перейти в каталог
            </Button>
            <Button component={Link} to="/order" variant="outlined">
              Оставить заявку
            </Button>
          </Stack>
        </Box>
      </Paper>
    </main>
  );
}

export default HomePage;
