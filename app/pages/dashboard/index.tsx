import { getWebsiteList } from '@/app/store/reducers/app';
import { useAppSelector } from '@/app/store/store';
import { Button, Card, CardActions, CardContent, CardMedia, LinearProgress, Link, Pagination, Tooltip } from '@mui/material';
import { Box, CardHeader, Grid, Paper, styled, Typography, } from '@mui/material'
import Axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const CardItem = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderRadius: 4
}));

const Dashboard = () => {
  const {
    websitelist,
    websitelistloading,
    websitelisterror,
    websitelimit,
    websitepage,
    websitestotal
  } = useAppSelector(state => state?.app)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getWebsiteList({page: websitepage, limit: websitelimit}))
  }, [dispatch])

  const subscribe = async(data: any) => {
    try {
      const formData = new FormData()
      formData.append(data?.formaccess?.inputname, 'tt@gmail.com');
      const {data: resp, status} = await Axios({
        method: data?.formaccess?.method, 
        url: `${data?.url.replace(/\/$/, "")}${data?.formaccess?.action}`,
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: formData
     })
     if(status === 200) {
        toast('Subscribed Successfully', {
          type: 'success'
        })
     }
    } catch(e) {
      toast('Failed to Subscribe', {
        type: 'error'
      })

    }
  }
  
  return (
    <Box sx={{ flexGrow: 1, padding: 20 }}>
      {websitestotal > 0 ? 
        <Pagination 
          count={Math.ceil(websitestotal/websitelimit)} 
          page={websitepage+1}
          onChange={(e, number) => dispatch(getWebsiteList({page: number-1, limit: websitelimit}))}
        />: 
      null}
      {websitelist?.length ? 
        <Grid container spacing={2}>
          {websitelist?.map((item: any, idx: number) => (
            <Grid key={`data-${idx}`} item xs={8} md={3}>
              <Card
                sx={{
                  maxWidth: 400,
                  margin: "0 auto",
                  // padding: "0.1em",
                  maxHeight: 375,
                  overflow: 'hidden'
                }}
              >
              <CardMedia
                component="img"
                alt={item?.title}
                width="100%"
                height="150"
                sx={{ objectFit: 'cover' }}
                src={!/^(?:f|ht)tps?\:\/\//.test(item?.image) ?  `https:${item?.image}`: item?.image}
              />
               <CardContent>
                  <Link href={item.url} target='_blank'>
                    {item?.url}
                  </Link>
                  <Tooltip title={item?.title}>
                    <Typography 
                      gutterBottom 
                      variant="h5" 
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: '1',
                        WebkitBoxOrient: 'vertical',
                      }} 
                    >
                      {item?.title}
                    </Typography>
                  </Tooltip>
                  <Tooltip title={item?.description}>
                  <Typography 
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: '2',
                      WebkitBoxOrient: 'vertical',
                    }} 
                    variant="body2"
                    color="text.secondary"
                  >
                    {item?.description}
                  </Typography>
                  </Tooltip>
                  <Grid sx={{ 
                    display: 'flex',  marginTop: 2, flexDirection: 'row', maxWidth: 400, overflowY: 'scroll' ,
                    overflowX: 'auto',
                    whiteSpace: 'nowrap',
                  }}>
                    {item?.category?.map((item: string) => {
                      return (
                        <>
                        <Tooltip title={item}>
                          <Typography 
                            sx={{
                              paddingX: 0.8, 
                              marginY: 0.4, 
                              marginX: 0.4, 
                              backgroundColor: '#55BF18', 
                              borderRadius: 1, 
                              flexDirection: 'row',
                            }} 
                          >
                            {item}
                          </Typography>
                        </Tooltip>
                        </>
                      )
                    })}
                  </Grid>
                </CardContent>
                <CardActions>
                  <Button 
                    sx={{color: '#18BF9C'}} 
                    variant='contained' 
                    size="small"
                    fullWidth
                    onClick={() => subscribe(item)}
                  >
                    Subscribe to this product
                  </Button>
                </CardActions>
                </Card>
            </Grid>))}
        </Grid>: 
        <Grid container alignItems={'center'} justifyContent='center'>
          No Items to display
        </Grid>
      }
      {websitelistloading ? <Grid container alignItems={'center'} justifyContent='center'>
          <LinearProgress />
        </Grid>: null} 
    </Box>
  )
}

export default Dashboard