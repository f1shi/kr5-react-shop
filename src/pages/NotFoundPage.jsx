import { Button, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <main className="app-main">
      <Paper elevation={2} sx={{ p: 4, display: 'grid', gap: 2 }}>
        <Typography variant="h4" component="h2">
          Страница не найдена
        </Typography>
        <Typography color="text.secondary">
          Возможно, адрес был введён неправильно или такой страницы больше не существует.
        </Typography>
        <Button component={Link} to="/" variant="contained" sx={{ justifySelf: 'start' }}>
          Вернуться на главную
        </Button>
      </Paper>
    </main>
  );
}

export default NotFoundPage;
