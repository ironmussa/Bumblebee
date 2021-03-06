# Build and Install From Source
To install Bumblebee directly on your OS first you'll need to the following packages and frameworks installed:
- Anaconda
- Jupyter Kernel Gateway
- Node.js 12-14
- MongoDB

To install Bumblebee first clone the repo using:

```
git clone https://github.com/hi-primus/bumblebee.git
cd Bumblebee
```

Then you'll be able to start the environment using the following command on Linux:

```
bash bbi.sh start environment
```

And on windows:

```
bbi.bat start environment
```

You’ll be asked to input your public address. It must be your external server IP address if you're hosting your Bumblebee project. If you want to use `localhost` instead, just press Enter.
