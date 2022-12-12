import { getWebsiteList } from '@/app/store/reducers/app';
import { useAppSelector } from '@/app/store/store';
import { Button, Card, CardActions, CardContent, CardMedia, LinearProgress, Link, Modal, Pagination, TextField, Tooltip } from '@mui/material';
import { Box, Grid, Typography, } from '@mui/material'
import { Formik } from 'formik';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import { genericApi } from '@/app/api';
import styles from './dashboard.module.scss'

const Dashboard = () => {
  const {
    websitelist,
    websitelistloading,
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
          const {status} = await genericApi(
            formData,
            data?.formaccess?.method,
            `${data?.url.replace(/\/$/, "")}${data?.formaccess?.action}`
          )
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
    <Box className={styles.container}>
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
            className={styles.modalcontainer}
          >
            <Grid className={styles.innercontainer}>
              <TextField 
                fullWidth
                placeholder='Enter email to subscribe'
                name='email'
                onChange={handleChange('email')}
                required
                value={values?.email}
                onBlur={handleBlur('email')}
                sx={{mb: 2}}
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
              <Card className={styles.itemcard}>
                <CardMedia
                  component="img"
                  alt={item?.title}
                  className={styles.img}
                  src={!/^(?:f|ht)tps?\:\/\//.test(item?.image) ?  `https:${item?.image}`: item?.image}
                />
                <CardContent>
                  <Link className={styles.linkcontainer} href={item.url} target='_blank'>
                    <InsertLinkIcon className={styles.linkicon}/>
                    <Typography className={styles.link}>
                      {item?.url}
                    </Typography>
                  </Link>
                  <Tooltip title={item?.title}>
                    <Typography 
                      gutterBottom 
                      variant="h5" 
                      className={styles.headtitle}
                    >
                      {item?.title}
                    </Typography>
                  </Tooltip>
                  <Tooltip title={item?.description}>
                  <Typography 
                    className={styles.carddesc} 
                    variant="body2"
                    color="text.secondary"
                  >
                    {item?.description}
                  </Typography>
                  </Tooltip>
                  <Grid className={styles.categorycontainer}>
                    {item?.category?.map((item: string) => {
                      return (
                        <>
                        <Tooltip title={item}>
                          <Typography className={styles.categoryitems}>
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
                    className={styles.cardactionbutton}
                    variant='contained' 
                    size='medium'
                    fullWidth
                    onClick={() => subscribe(item)}
                  >
                    Subscribe to this product
                  </Button>
                </CardActions>
                </Card>
            </Grid>))}
        </Grid>: 
        <Grid container alignItems='center' justifyContent='center'>
          No Items to display
        </Grid>
      }
      {websitelistloading ? 
        <Box className={styles.progressbar}>
          <LinearProgress />
        </Box>:
      null} 
    </Box>
  )
}

export default Dashboard