import { getWebsiteList } from '@/app/store/reducers/app';
import { useAppSelector } from '@/app/store/store';
import { Button, Card, CardActions, CardContent, CardMedia, Input, LinearProgress, Link, Modal, Pagination, TextField, Tooltip } from '@mui/material';
import { Box, CardHeader, Grid, Paper, styled, Typography, } from '@mui/material'
import Axios from 'axios';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import InsertLinkIcon from '@mui/icons-material/InsertLink';

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

  const [emailModal, setEmailModal] = useState(false)
  const subscribe = async(data: any) => {
    try {
      const email = await localStorage.getItem('email')
      if(!email){
        setEmailModal(true)
      } else {
        if(data?.formaccess?.action && data?.formaccess?.inputname) {
          const formData = new FormData()
          formData.append(data?.formaccess?.inputname, email);
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
        }
      }
    } catch(e) {
      toast('Failed to Subscribe', {
        type: 'error'
      })
    }
  }
  
  return (
    <Box sx={{ flexGrow: 1, padding: 20 }}>
      <Grid sx={{ marginY: 3 }}>
        {websitestotal > 0 ? 
          <Pagination 
            count={Math.ceil(websitestotal/websitelimit)} 
            page={websitepage+1}
            onChange={(e, number) => dispatch(getWebsiteList({page: number-1, limit: websitelimit}))}
          />: 
        null}
      </Grid>
      <Grid container>
        <Formik
          initialValues={{ email: '' }}
          onSubmit={async(values, { resetForm }) => {
            await localStorage.setItem('email', values?.email)
            await resetForm()
            await setEmailModal(false)
            await toast('Added Email succesfully', {
              type: 'success'
            })
          }}
        >
        {({
          values,
          handleChange,
          handleSubmit,
          isValid,
          handleBlur
        }) => (
          <Modal
            open={emailModal}
            onClose={() => setEmailModal(false)}
            sx={{
              display:'flex',
              alignItems:'center',
              justifyContent:'center'
            }}
          >
            <Grid
              sx={{ backgroundColor: 'white'}} 
              height={'50vh'} 
              width={'600px'}
              justifyContent='center'
              alignItems={'center'}
              p={3}
            >
              <TextField 
                fullWidth
                placeholder='Enter email to subscribe'
                name='email'
                onChange={handleChange('email')}
                required
                value={values?.email}
                onBlur={handleBlur('email')}
                sx={{
                  mb: 2
                }}
              />
              <Button onClick={() => handleSubmit()} fullWidth variant='contained'>
                Submit
              </Button>
            </Grid>
          </Modal>
        )}
        </Formik>
      </Grid>
      {websitelist?.length ? 
        <Grid container spacing={2}>
          {websitelist?.map((item: any, idx: number) => (
            <Grid key={`data-${idx}`} item xs={8} md={3}>
              <Card
                sx={{
                  maxWidth: 400,
                  margin: "0 auto",
                  minHeight: 345,
                  maxHeight: 345,
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
                  <Link sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} href={item.url} target='_blank'>
                    <InsertLinkIcon sx={{ fontSize: 20, mr: 0.4 }} />
                    <Typography sx={{ fontSize: 12, fontWeight: 400 }}>
                      {item?.url}
                    </Typography>
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
                        fontSize: 15,
                        color: '#222222'
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
                      fontSize: 10,
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
                              backgroundColor: '#68B984', 
                              borderRadius: 1, 
                              flexDirection: 'row',
                              fontSize: 12
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
                <CardActions >
                  <Button 
                    sx={{backgroundColor: '#3D5656', fontSize: 10}} 
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