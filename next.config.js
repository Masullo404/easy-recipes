module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'images.pexels.com',
          port: '',
          pathname: '/photos/**',
        },
        {
          protocol: 'https',
          hostname: 'img.freepik.com',
          port: '',
          pathname: '/free-vector/**',
        },
        {
          protocol: 'https',
          hostname: 'img.freepik.com',
          port: '',
          pathname: '/free-psd/**',
        },
        {
          protocol: 'https',
          hostname: 'cdn.pixabay.com',
          port: '',
          pathname: '/photo/**',
        },
      ],
    },
  }