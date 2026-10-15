import { Box, Button, Chip, Paper, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../utils/categories';

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

      <Paper component="section" elevation={2} sx={{ p: 4, mt: 3 }} aria-labelledby="home-categories-title">
        <Typography id="home-categories-title" variant="h5" component="h2" gutterBottom>
          Категории
        </Typography>
        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
          {CATEGORIES.map((category) => (
            <Chip
              key={category.value}
              label={category.label}
              component={Link}
              to={`/catalog?category=${category.value}`}
              clickable
              color="primary"
              variant="outlined"
            />
          ))}
        </Stack>
      </Paper>
    </main>
  );
}

export default HomePage;
