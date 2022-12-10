import { Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Grid, Link, Paper, styled, TextField, Typography } from '@mui/material'
import {Formik} from 'formik'
import { useDispatch } from 'react-redux';
import { addUrl } from '@/app/store/reducers/app';
import { useAppSelector } from '@/app/store/store';
import AddIcon from '@mui/icons-material/Add';

const AddWebsite = () => {
  const dispatch = useDispatch()
  const { 
    urladdloading,
    urladdresult,
  } = useAppSelector(state => state?.app)

  return (
    <Grid sx={{ flexGrow: 1, padding: 20 }} flexDirection='column' container alignItems='center' justifyContent={'center'}>
      <Formik
        initialValues={{ url: '' }}
        onSubmit={(values, { resetForm }) => {
          dispatch(addUrl(values))
          resetForm()
        }}
      >
       {({
         values,
         handleChange,
         handleSubmit,
         isValid,
         handleBlur
       }) => (
          <>
            <TextField  
              placeholder='Enter url to add'
              fullWidth
              name='url'
              onChange={handleChange('url')}
              required
              value={values?.url}
              onBlur={handleBlur('url')}
            />
            <Button sx={{ marginY: 1 }} variant='contained' disabled={!isValid ||  urladdloading} onClick={(data: any) => handleSubmit(data)}>
              {urladdloading ? <CircularProgress />: 'Add URL'}
            </Button>
            
          </>
       )}
       </Formik>
       {urladdresult ? 
          <Card>
            <CardMedia
              component="img"
              alt={urladdresult?.title}
              height="100%"
              width="100%"
              src={
                !/^(?:f|ht)tps?\:\/\//.test(urladdresult?.image) ?  `https:${urladdresult?.image}`: urladdresult?.image
              }
            />
            <CardContent>
              <Link href={urladdresult.url} target='_blank'>
                {urladdresult?.url}
              </Link>
              <Typography gutterBottom variant="h5" component="div">
                {urladdresult?.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
               {urladdresult?.description}
              </Typography>
              <Grid sx={{ display: 'flex', flexWrap: 'wrap', marginTop: 2 }}>
                {urladdresult?.category?.map((item: string) => {
                  return (
                    <Typography 
                      sx={{ paddingX: 0.8, paddingY: 0.3, marginX: 1, backgroundColor: '#55BF18', borderRadius: 1}}
                    >
                      {item}
                    </Typography>
                  )
                })}
                <AddIcon />
              </Grid>
              <Grid sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', marginTop: 2 }}>
                {urladdresult?.formaccess && Object?.keys(urladdresult?.formaccess)?.map((item: string) => {
                  return (
                    <Grid container flexDirection={'row'}>
                      <Typography sx={{ paddingY: 0.3, fontWeight: '600'}}>
                        {item}: 
                      </Typography>
                      <Typography 
                        sx={{ paddingX: 0.8, paddingY: 0.3, marginX: 1}}
                      >
                      {urladdresult?.formaccess[item]}
                      </Typography>
                    </Grid>
                  )
                })}
              </Grid>
            </CardContent>
            <CardActions>
              <Button 
                sx={{color: '#18BF9C'}} 
                variant='outlined' 
                size="small"
              >
                Add Extra property manually
              </Button>
              <Button 
                sx={{color: '#18BF9C'}} 
                variant='outlined' 
                size="small"
              >
                Add Form Access Property or Create Privilege
              </Button>
            </CardActions>
          </Card>: 'No Website to show'
        }
    </Grid>    
  )
}

export default AddWebsite