import { Card, Grid, Typography } from "@mui/material";
import { WeatherObj } from "../../redux/features/weather/weatherSlice";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

export function WeatherCard({
  cityName,
  isLoading,
  value: weather,
}: {
  cityName: string;
  isLoading: boolean;
  value: WeatherObj | undefined;
}) {
  let imgUrl = "";
  let city = "";
  let temp = 0;

  if (weather) {
    city = weather.name;
    imgUrl = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
    temp = Math.round(weather.main.temp);
  }

  return (
    <Grid2 xs={6} md={4}>
      <Card>
        <Grid2
          container
          alignItems="center"
          spacing={2}
          justifyContent="space-around"
        >
          <Grid2>
            <img src={imgUrl} alt="" />
          </Grid2>
          <Grid2>
            <Typography variant="h4" component="p">
              {temp}°C
            </Typography>
          </Grid2>
        </Grid2>
        <Typography variant="h5" component="p" textAlign="center" pb={3}>
          {city}
        </Typography>
      </Card>
    </Grid2>
  );
}
